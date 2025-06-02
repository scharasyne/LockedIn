// import React, { useCallback } from 'react';
// import Particles from 'react-tsparticles';
// import { tsParticles } from '@tsparticles/engine';
// import { loadBasic } from '@tsparticles/basic';

// const ParticlesBackground = () => {
//   const particlesInit = useCallback(async () => {
//     await loadBasic(tsParticles);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: {
//           color: { value: '#010101' }
//         },
//         fullScreen: { enable: true, zIndex: -1 },
//         fpsLimit: 60,
//         particles: {
//           color: { value: '#ffffff' }, // white particles
//           links: {
//             enable: true,
//             color: '#ffffff',
//             distance: 150,
//             opacity: 0.2,
//             width: 1,
//           },
//           move: {
//             enable: true,
//             speed: 1,
//             direction: 'none',
//             outModes: { default: 'bounce' },
//           },
//           number: {
//             value: 60,
//             density: { enable: true, area: 800 },
//           },
//           opacity: {
//             value: 0.5,
//           },
//           shape: {
//             type: 'circle',
//           },
//           size: {
//             value: { min: 1, max: 3 },
//           },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// };

// export default ParticlesBackground;
