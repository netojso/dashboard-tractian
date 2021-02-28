export default function translateStatus(status?: string) {
  if(status !== undefined) {
    if(status.includes('Alert')) {
      return {
        status: 'Alerta',
        color: 'red'
      }
    }
    if(status.includes('Operation')) {
      return {
        status: 'Operação',
        color: 'green'
      }
    }
    if(status.includes('Downtime')) {
      return {
        status: 'Parada',
        color: 'blue'
      }
    }
  }
}
