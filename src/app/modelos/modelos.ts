export interface usuario {
  id:string;
  Matricula: string;
  Nombre: string;
  Email: string;
  Password: string;
  TipoUsuario: string;
}
export interface garantias {
  NumPoliza: string;
  NumSerie: string;
  ClaveProducto: string;
  Tienda: string;
  Direccion: string;
  FechaCompra: string;
  FechaExpiracion: string;
  DuracionGarantia: string;
  Archivo: string;
}
export interface climas {
  id: string;
  nombre: string;
  capacidadt: string;
  capacidade: string;
  modelo: string;
  consumo: string;
  alto_ancho: string;
  costo: string;
  estado: string;
  edificio: string;
  lugar_edificio: string;
  tipo: string;
  qr: boolean;
  foto: string;
  garantia: string;
}
export interface computadoras {
  //NumSerie: string;
  id: string;
  PlacaMadre: string;
  Procesador: string;
  DiscoDuro: string;
  Ram: string;
  SO: string;
  costo: string;
  estado: string;
  edificio: string;
  lugar_edificio: string;
  tipo: string;
  qr: boolean;
  foto: string;
  garantia: string;
}
export interface muebles {
  id: string;
  nombre: string;
  marca: string;
  costo: string;
  caracteristicas: string;
  estado: string;
  edificio: string;
  lugar_edificio: string;
  tipo: string;
  subtipo:string
  qr: boolean;
  foto: string;
  garantia: string;
}
export interface monitores {
  id: string;
  nombre: string;
  marca: string;
  hz: string;
  resolucion: string;
  tipoentrada: string;
  costo: string;
  estado: string;
  edificio: string;
  lugar_edificio: string;
  tipo: string;
  qr: boolean;
  foto: string;
  garantia: string;
}
export interface proyectores {
  id: string;
  modelo: string;
  marca: string;
  tipoentrada: string;
  costo: string;
  estado: string;
  edificio: string;
  lugar_edificio: string;
  tipo: string;
  qr: boolean;
  foto: string;
  garantia: string;
}
export interface extintores{
  id: string;
} 
export interface reportes{
  Item:string;
  autor:string;
  descripcion:string;
  ubicacionItem:string;
  tipoItem:string
  fecha:string;
  estado:string
}
export interface mantenimientos{
  id:string;
  Item:string;
  tipo:string;
  fechaS:string;
  fechaT:string;
  costo:string;
  reporte:string;
}
