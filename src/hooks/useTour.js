import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export function useTour() {
  // Configuración común para todos los tours
  const commonConfig = {
    showProgress: true,
    animate: true,
    opacity: 0.75,
    padding: 10,
    allowClose: true,
    overlayClickNext: false,
    nextBtnText: '→ Siguiente',
    prevBtnText: '← Anterior',
    doneBtnText: '✓ Finalizar',
    progressText: '{{current}} de {{total}}',
    showButtons: ['next', 'previous', 'close'],
    disableActiveInteraction: false,
    popoverClass: 'blocki-tour-popover',
    onDestroyStarted: (element, step, options) => {
      // Guardar que el usuario completó el tour
      if (step.isLast) {
        localStorage.setItem('blocki-tour-completed', 'true')
      }
    },
    onHighlightStarted: (element, step, options) => {
      // Scroll suave al elemento
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const homeTour = () => {
    const driverObj = driver({
      ...commonConfig,
      steps: [
        {
          element: '.hero-section',
          popover: {
            title: '🏠 Bienvenido a Blocki',
            description: 'La primera plataforma de tokenización de propiedades en LATAM con Zero-Knowledge Privacy. Aquí puedes invertir en real estate desde $100 USD con total seguridad y transparencia blockchain.',
            position: 'bottom',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '.search-section',
          popover: {
            title: '🔍 Busca y Filtra',
            description: 'Utiliza nuestra búsqueda inteligente y filtros avanzados para encontrar la propiedad perfecta según tu presupuesto, ubicación y tipo de inversión. Todas verificadas y auditadas.',
            position: 'bottom'
          }
        },
        {
          element: '.property-card:first-child',
          popover: {
            title: '🏘️ Propiedades Tokenizadas',
            description: 'Cada propiedad está dividida en tokens que representan fracciones de propiedad real. Puedes comprar desde 1 token hasta miles, invirtiendo exactamente lo que quieras. Cada token genera dividendos proporcionales.',
            position: 'top'
          }
        },
        {
          element: '[href="/dashboard"]',
          popover: {
            title: '📊 Tu Dashboard Personal',
            description: 'Accede a tu panel de control personalizado donde puedes ver todas tus inversiones, ganancias en tiempo real, historial de dividendos y el rendimiento de tu portafolio. Todo respaldado por Stellar blockchain.',
            position: 'bottom'
          }
        },
        {
          element: '[href="/wallet"]',
          popover: {
            title: '💰 Tu Billetera Stellar',
            description: 'Gestiona tus activos en Stellar Network de forma segura. Envía, recibe XLM, USDC y administra tus tokens BLOCKI. Todas las transacciones son instantáneas y con fees mínimos.',
            position: 'bottom'
          }
        },
        {
          element: '.publish-button',
          popover: {
            title: '🚀 Tokeniza tu Propiedad',
            description: '¿Tienes una propiedad? ¡Tokenízala y accede a miles de inversores en toda LATAM! El proceso es simple, seguro y completamente legal. Obtén liquidez sin vender tu propiedad completa.',
            position: 'bottom'
          }
        },
        {
          popover: {
            title: '🎉 ¡Listo para Empezar!',
            description: 'Ya conoces lo básico de Blocki. Ahora puedes explorar propiedades, invertir desde $100 USD, o tokenizar tu propio inmueble. Si necesitas ayuda, haz clic en el botón de ayuda (?) en cualquier momento.',
            position: 'center'
          }
        }
      ]
    })

    driverObj.drive()
  }

  const dashboardTour = () => {
    const driverObj = driver({
      ...commonConfig,
      steps: [
        {
          popover: {
            title: '👋 Bienvenido a tu Dashboard',
            description: 'Este es tu centro de control de inversiones. Aquí puedes ver todo sobre tu portafolio en tiempo real, respaldado 100% por Stellar blockchain.',
            position: 'center'
          }
        },
        {
          element: '.dashboard-stats',
          popover: {
            title: '📈 Resumen de Inversiones',
            description: 'Visualiza tus métricas principales en tiempo real: inversión total, valor actual de tu portafolio, ganancias acumuladas y retornos mensuales. Todas las cifras están actualizadas al segundo con datos de blockchain.',
            position: 'bottom'
          }
        },
        {
          element: '.investment-list',
          popover: {
            title: '🏘️ Mis Propiedades',
            description: 'Lista completa de todas las propiedades en las que has invertido. Cada card muestra tu participación (tokens), valor actual, ROI y dividendos generados. Haz clic en cualquiera para ver análisis detallado.',
            position: 'top'
          }
        },
        {
          element: '.transactions-section',
          popover: {
            title: '📜 Historial Blockchain',
            description: 'Todas tus transacciones verificadas en Stellar blockchain: compras de tokens, dividendos recibidos, ventas realizadas. Cada operación tiene su hash de transacción para total transparencia.',
            position: 'top'
          }
        },
        {
          element: '.wallet-info',
          popover: {
            title: '🔐 Información de Seguridad',
            description: 'Tu dirección Stellar pública, estado de verificación KYC con Zero-Knowledge Proofs, y nivel de seguridad de la cuenta. Tu privacidad está protegida mientras cumples con regulaciones.',
            position: 'left'
          }
        },
        {
          popover: {
            title: '✅ Dashboard Completo',
            description: 'Ya conoces todas las secciones de tu dashboard. Explora tus inversiones, revisa tus ganancias y mantente al día con tu portafolio inmobiliario tokenizado.',
            position: 'center'
          }
        }
      ]
    })

    driverObj.drive()
  }

  const walletTour = () => {
    const driverObj = driver({
      ...commonConfig,
      steps: [
        {
          popover: {
            title: '💳 Tu Billetera Stellar',
            description: 'Gestiona todos tus activos en la red Stellar de forma segura. XLM, USDC, y tokens BLOCKI - todo en un solo lugar con seguridad de nivel institucional.',
            position: 'center'
          }
        },
        {
          element: '.wallet-address',
          popover: {
            title: '🔑 Tu Dirección Pública',
            description: 'Esta es tu dirección única e irrepetible en la red Stellar. Es como tu número de cuenta bancaria - compártela para recibir pagos, pero NUNCA compartas tu clave privada. La dirección es pública y segura de compartir.',
            position: 'bottom'
          }
        },
        {
          element: '.balance-cards',
          popover: {
            title: '💰 Tus Balances en Tiempo Real',
            description: 'Aquí ves todos tus activos: XLM (Lumens - la criptomoneda nativa de Stellar), USDC (stablecoin atada al dólar), y tokens BLOCKI. Los valores se actualizan automáticamente desde blockchain cada pocos segundos.',
            position: 'bottom'
          }
        },
        {
          element: '.send-form',
          popover: {
            title: '📤 Enviar Fondos Instantáneamente',
            description: 'Transfiere XLM, USDC o tokens BLOCKI a cualquier dirección Stellar en el mundo. Las transacciones se confirman en 3-5 segundos con fees ultra bajos (fracciones de centavo). Perfectecto para pagos internacionales.',
            position: 'right'
          }
        },
        {
          element: '.network-status',
          popover: {
            title: '🌐 Estado de Stellar Network',
            description: 'Monitorea la salud de Stellar en tiempo real: número de transacciones por segundo, tiempo de confirmación promedio, y status general. Stellar procesa miles de transacciones por segundo con 99.99% uptime.',
            position: 'left'
          }
        },
        {
          popover: {
            title: '🛡️ Seguridad es Prioridad',
            description: 'Recuerda: NUNCA compartas tu clave privada o seed phrase con nadie. Blocki nunca te la pedirá. Mantén tu seed phrase segura - es la única forma de recuperar tu wallet.',
            position: 'center'
          }
        }
      ]
    })

    driverObj.drive()
  }

  const publishTour = () => {
    const driverObj = driver({
      ...commonConfig,
      doneBtnText: '🚀 Comenzar a Tokenizar',
      steps: [
        {
          popover: {
            title: '🏠 Tokeniza tu Propiedad',
            description: 'Convierte tu propiedad en tokens digitales y accede a un mercado de miles de inversores en toda América Latina. El proceso es 100% legal, seguro y guiado paso a paso.',
            position: 'center'
          }
        },
        {
          element: '.step-indicator',
          popover: {
            title: '📋 Proceso en 4 Pasos',
            description: 'Te guiaremos a través de 4 simples pasos: 1) Información básica de la propiedad, 2) Detalles y características, 3) Información financiera y tokenización, 4) Documentos legales. Todo diseñado para ser fácil y completo.',
            position: 'bottom'
          }
        },
        {
          popover: {
            title: '⚖️ Verificación Legal',
            description: 'Nuestro equipo legal revisará todos los documentos antes de publicar: escrituras, avalúos, certificados de libertad de gravamen. Esto protege tanto a ti como a los inversores y cumple con todas las regulaciones de LATAM.',
            position: 'center'
          }
        },
        {
          popover: {
            title: '💎 Beneficios de Tokenizar',
            description: '✓ Obtén liquidez sin vender la propiedad completa\n✓ Accede a miles de inversores simultáneamente\n✓ Mantén control sobre tu propiedad\n✓ Recibe inversión en 24-48 horas post-aprobación\n✓ Comisiones más bajas que métodos tradicionales',
            position: 'center'
          }
        },
        {
          popover: {
            title: '🎉 ¡Listo para Empezar!',
            description: 'Una vez aprobada tu propiedad, estará disponible para inversores en Buenos Aires, São Paulo, Santiago, Medellín, Lima y toda LATAM. ¡El futuro del real estate comienza ahora!',
            position: 'center'
          }
        }
      ]
    })

    driverObj.drive()
  }

  // Nuevo tour para ZK-KYC
  const zkKYCTour = () => {
    const driverObj = driver({
      ...commonConfig,
      doneBtnText: '🔐 Entendido',
      steps: [
        {
          popover: {
            title: '🔐 Zero-Knowledge KYC',
            description: 'Verifica tu identidad SIN revelar información personal sensible. Esta es tecnología de punta en privacidad criptográfica, la misma que usan aplicaciones como Zcash y Polygon ID.',
            position: 'center'
          }
        },
        {
          element: '.zk-private-section',
          popover: {
            title: '🙈 Datos Privados (Solo en tu Dispositivo)',
            description: 'Estos datos NUNCA salen de tu computadora. Los usas para generar una prueba matemática local. Ni Blocki ni nadie más puede verlos. Es computación local, no enviamos nada a servidores.',
            position: 'right'
          }
        },
        {
          element: '.zk-public-section',
          popover: {
            title: '✅ Prueba Pública (Lo Único que Compartimos)',
            description: 'Solo compartimos una prueba criptográfica que demuestra: "Este usuario es mayor de 18, vive en LATAM, y está verificado" - SIN revelar edad exacta, país específico, o documentos. Matemáticamente imposible de falsificar.',
            position: 'left'
          }
        },
        {
          popover: {
            title: '🌟 ¿Por Qué es Revolucionario?',
            description: 'Cumplimiento regulatorio + Privacidad total era imposible antes de Zero-Knowledge Proofs. Ahora puedes probar que cumples requisitos legales sin compartir datos sensibles. El futuro de KYC en Web3.',
            position: 'center'
          }
        },
        {
          popover: {
            title: '🎯 Seguridad Blockchain',
            description: 'Tu prueba ZK se registra en Stellar blockchain como un hash commitment. Es inmutable, verificable por cualquiera, y no contiene tus datos personales. Transparencia sin comprometer privacidad.',
            position: 'center'
          }
        }
      ]
    })

    driverObj.drive()
  }

  return {
    homeTour,
    dashboardTour,
    walletTour,
    publishTour,
    zkKYCTour
  }
}
