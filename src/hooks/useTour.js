import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export function useTour() {
  const homeTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.hero-section',
          popover: {
            title: 'Bienvenido a Blocki',
            description: 'La primera plataforma de tokenización de propiedades en LATAM. Aquí puedes invertir en real estate desde $2,500 MXN.',
            position: 'bottom'
          }
        },
        {
          element: '.search-section',
          popover: {
            title: 'Busca Propiedades',
            description: 'Utiliza los filtros para encontrar la propiedad perfecta según tu presupuesto, ubicación y tipo.',
            position: 'bottom'
          }
        },
        {
          element: '.property-card:first-child',
          popover: {
            title: 'Propiedades Tokenizadas',
            description: 'Cada propiedad está dividida en tokens. Puedes comprar la cantidad que desees e invertir según tu presupuesto.',
            position: 'top'
          }
        },
        {
          element: '[href="/dashboard"]',
          popover: {
            title: 'Tu Dashboard',
            description: 'Accede a tu panel para ver tus inversiones, ganancias y portafolio en tiempo real.',
            position: 'bottom'
          }
        },
        {
          element: '[href="/wallet"]',
          popover: {
            title: 'Tu Billetera',
            description: 'Gestiona tus activos en Stellar Network. Envía, recibe y administra tus tokens BLOCKI.',
            position: 'bottom'
          }
        },
        {
          element: '.publish-button',
          popover: {
            title: 'Publica tu Propiedad',
            description: 'Si tienes una propiedad, ¡tokenízala! Accede a un nuevo mercado de inversores.',
            position: 'bottom'
          }
        }
      ],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      onDestroyStarted: () => {
        driverObj.destroy()
      }
    })

    driverObj.drive()
  }

  const dashboardTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.dashboard-stats',
          popover: {
            title: 'Resumen de Inversiones',
            description: 'Visualiza tus métricas principales: inversión total, valor actual, ganancias y retornos mensuales.',
            position: 'bottom'
          }
        },
        {
          element: '.investment-list',
          popover: {
            title: 'Mis Inversiones',
            description: 'Lista de todas las propiedades en las que has invertido. Haz clic en cualquiera para ver detalles.',
            position: 'top'
          }
        },
        {
          element: '.transactions-section',
          popover: {
            title: 'Historial de Transacciones',
            description: 'Revisa todas tus compras y dividendos recibidos, todo verificado en blockchain.',
            position: 'top'
          }
        },
        {
          element: '.wallet-info',
          popover: {
            title: 'Información de Billetera',
            description: 'Tu dirección Stellar y estado de verificación KYC. Todo seguro y transparente.',
            position: 'left'
          }
        }
      ],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      onDestroyStarted: () => {
        driverObj.destroy()
      }
    })

    driverObj.drive()
  }

  const walletTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.wallet-address',
          popover: {
            title: 'Tu Dirección Stellar',
            description: 'Esta es tu dirección única en la red Stellar. Úsala para recibir pagos y gestionar activos.',
            position: 'bottom'
          }
        },
        {
          element: '.balance-cards',
          popover: {
            title: 'Tus Balances',
            description: 'Aquí ves tus XLM (Lumens) y tokens BLOCKI. Todo actualizado en tiempo real.',
            position: 'bottom'
          }
        },
        {
          element: '.send-form',
          popover: {
            title: 'Enviar Fondos',
            description: 'Transfiere XLM o BLOCKI a otras direcciones de Stellar de forma rápida y segura.',
            position: 'right'
          }
        },
        {
          element: '.network-status',
          popover: {
            title: 'Estado de la Red',
            description: 'Monitorea el estado de Stellar Network en tiempo real. Siempre transparente.',
            position: 'left'
          }
        }
      ],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Finalizar',
      onDestroyStarted: () => {
        driverObj.destroy()
      }
    })

    driverObj.drive()
  }

  const publishTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: 'Tokeniza tu Propiedad',
            description: 'Sigue estos 4 pasos para publicar tu propiedad y acceder a miles de inversores.',
            position: 'center'
          }
        },
        {
          element: '.step-indicator',
          popover: {
            title: 'Proceso Guiado',
            description: 'Te guiaremos paso a paso para asegurar que toda la información sea correcta y completa.',
            position: 'bottom'
          }
        },
        {
          popover: {
            title: 'Verificación Legal',
            description: 'Todos los documentos serán revisados por nuestro equipo legal antes de publicar tu propiedad.',
            position: 'center'
          }
        },
        {
          popover: {
            title: '¡Listo!',
            description: 'Una vez aprobada, tu propiedad estará disponible para miles de inversores en toda LATAM.',
            position: 'center'
          }
        }
      ],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: 'Comenzar',
      onDestroyStarted: () => {
        driverObj.destroy()
      }
    })

    driverObj.drive()
  }

  return {
    homeTour,
    dashboardTour,
    walletTour,
    publishTour
  }
}
