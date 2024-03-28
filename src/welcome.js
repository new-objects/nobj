import chalkAnimation from 'chalk-animation';

const sleep = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export async function welcome() {
  const welcomeTitle = chalkAnimation.rainbow(
    'nobj - creating new objects since 2023',
  );
  await sleep();
  welcomeTitle.stop();
}
