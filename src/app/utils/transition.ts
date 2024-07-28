
function transformOpacity(target: HTMLElement, opacity: number, delay: number): Promise<void> {
  return new Promise((resolve) => {
    target.style.opacity = `${opacity}`;
    setTimeout(() => {
      resolve();
    }, delay);
  })  
}


export function fadeOut(target: HTMLElement, duration: number, delta?: number) : Promise<boolean> {
  return new Promise(async (resolve) => {
    delta ??= .05; 
    let opacity = parseFloat(target.style.opacity) || 1;  //current opacity
    const delay = Math.round(duration / (opacity/delta));
    while(opacity > 0) {
      opacity -= delta;
      await transformOpacity(target, Math.max(opacity, 0), delay);
    }
    resolve(true);
  });
}

export function fadeIn(target: HTMLElement, duration: number, delta?: number) : Promise<boolean> {
  return new Promise(async (resolve) => {
    delta ??= .05; 
    let opacity = parseFloat(target.style.opacity) || 0;  //current opacity
    const delay = Math.round(duration / (opacity/delta));
    while(opacity < 1) {
      opacity += delta;
      await transformOpacity(target, Math.min(opacity, 1), delay);
    }
    resolve(true);
  });
}