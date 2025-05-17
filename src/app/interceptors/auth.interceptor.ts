import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable,throwError,from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1️⃣ Leer el accessToken
    const accessToken = localStorage.getItem('accessToken');

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('❌ Interceptor atrapó error:', error);

        // 2️⃣ Si es 401 intenta refrescar token
        if (error.status === 401) {
          console.log('🔄 Intentando refrescar accessToken...');
          return from(this.refreshAccessToken()).pipe(
            switchMap(newAccessToken => {
              if (newAccessToken) {
                // 3️⃣ Reintenta la petición original con el nuevo token
                const newReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                });
                return next.handle(newReq);
              } else {
                console.warn('⚠️ No se pudo refrescar el token. Redirigiendo a login.');
                this.logout();  // O navega a login
                return throwError(() => error);
              }
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.warn('⚠️ No hay refresh token disponible.');
      return null;
    }

    try {
      const response = await fetch('http://localhost:3000/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        console.error('❌ Error en refresh API:', response.status);
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        console.log('✅ Nuevo accessToken guardado:', newAccessToken);
        return newAccessToken;
      }

      return null;

    } catch (err) {
      console.error('❌ Error al hacer refresh:', err);
      return null;
    }
  }

  private logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';  // Redirige al login
  }


}