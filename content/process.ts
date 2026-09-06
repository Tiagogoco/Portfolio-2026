export type Fase = { n: string; label: string; desc: string };

export const proceso: Fase[] = [
  {
    n: '1',
    label: 'SPEC ANTES QUE CÓDIGO',
    desc: 'Fijo por escrito el modelo de negocio, los pagos y las reglas duras antes de la primera línea. Si no está decidido, no se programa.',
  },
  {
    n: '2',
    label: 'DISEÑO DEL SISTEMA VISUAL',
    desc: 'Paleta, tipografía y modos claro y oscuro se deciden en el spec, no al final, con sus consecuencias técnicas anotadas.',
  },
  {
    n: '3',
    label: 'DATOS Y PERMISOS PRIMERO',
    desc: 'Migraciones numeradas, una por propósito, y las políticas de acceso antes que cualquier pantalla.',
  },
  {
    n: '4',
    label: 'IMPLEMENTACIÓN POR FASES, CON CIERRE',
    desc: 'Una tarea a la vez con criterios de aceptación. Al cerrar: build limpio, commit atómico y entrada en la bitácora.',
  },
  {
    n: '5',
    label: 'DESPLIEGUE Y OPERACIÓN',
    desc: 'El despliegue tiene su propio plan, con checklist funcional y de seguridad. Después, mantener: auditorías y decisiones que cambian con el negocio.',
  },
];
