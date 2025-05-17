import { Component, OnInit } from '@angular/core';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';
import { ToastController } from '@ionic/angular';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-postulaciones-panel',
  templateUrl: './postulaciones-panel.page.html',
  styleUrls: ['./postulaciones-panel.page.scss'],
  standalone: false
})
export class PostulacionesPanelPage implements OnInit {

  recibidas: Postulacion[] = [];
  enviadas: Postulacion[] = [];
  pagosMensuales: any[] = [];
  pagosRecibidos: any[] = [];

  propiedadesPostuladas: { id_postulacion: number, titulo: string }[] = [];
  idPostulacionSeleccionada: number | null = null;

  verPagosRecibidos: boolean = false;
  vistaPostulaciones: 'recibidas' | 'enviadas' = 'recibidas';

  constructor(
    private postulacionService: PostulacionService,
    private pagoService: PagoService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    console.log('🟢 Componente PostulacionesPanelPage iniciado');
    this.cargarPostulaciones();
  }

  cargarPostulaciones(): void {
    this.postulacionService.getMisPostulaciones().subscribe({
      next: (res) => {
        this.enviadas = res;
        this.propiedadesPostuladas = res
          .filter(p => p.estado === 'aceptada')
          .map(p => ({
            id_postulacion: p.id_postulacion,
            titulo: p.Propiedad?.titulo || `Propiedad ${p.id_postulacion}`
          }));
      },
      error: (err) => console.error('❌ Error al cargar postulaciones enviadas:', err)
    });

    this.postulacionService.getPostulacionesRecibidas().subscribe({
      next: (res) => this.recibidas = res,
      error: (err) => console.error('❌ Error al cargar postulaciones recibidas:', err)
    });
  }

  async actualizarEstado(p: Postulacion, estado: 'aceptada' | 'rechazada') {
    try {
      await this.postulacionService.actualizarEstadoPostulacion(p.id_postulacion, estado).toPromise();
      if (estado === 'aceptada') {
        this.pagoService.crearPagosMensuales(p.id_postulacion).subscribe();
      }
      const toast = await this.toastCtrl.create({
        message: `Postulación ${estado}`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.cargarPostulaciones();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al actualizar postulación',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  mostrarPagos(id_postulacion: number) {
    this.pagoService.obtenerPagosMensuales(id_postulacion).subscribe({
      next: (res) => this.pagosMensuales = res,
      error: (err) => console.error('❌ Error al obtener pagos mensuales', err)
    });
  }

  pagarMes(pago: any) {
    this.pagoService.iniciarPagoMensual(pago.id_pago_mensual).subscribe({
      next: (res) => window.location.href = `${res.url}?token_ws=${res.token}`,
      error: (err) => console.error('❌ Error al iniciar pago mensual', err)
    });
  }

  cargarPagosRecibidos() {
    this.pagoService.obtenerPagosRecibidos().subscribe({
      next: (res) => this.pagosRecibidos = res,
      error: (err) => console.error('❌ Error al obtener pagos recibidos', err)
    });
  }

  onSeleccionarPostulacion(id_postulacion: number) {
    this.idPostulacionSeleccionada = id_postulacion;
    this.mostrarPagos(id_postulacion);
  }

  onTogglePagosRecibidos(valor: boolean) {
    this.verPagosRecibidos = valor;
    if (valor) {
      this.cargarPagosRecibidos();
    }
  }

}
