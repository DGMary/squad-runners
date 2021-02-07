function initCountdown(){
  const endTime = document.getElementById('js-countdown').getAttribute('data-time');
  const radiusEl = document.getElementById('js-countdown').getAttribute('data-radius');
  
  const end = new Date(endTime).getTime();
  const dayEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  
  const x = setInterval(function () {
  
    let now = new Date().getTime();  
    const difference = end - now;  
  
    const dayCircle = document.getElementById('circle-days');
    const hoursCircle = document.getElementById('circle-hours');
    const minutesCircle = document.getElementById('circle-minutes');
    const secondsCircle = document.getElementById('circle-seconds');
    const dasharrayEl = Math.floor(2 * Math.PI * radiusEl);
        
    let dayData = (30 - Math.floor( (difference % days) / hours ))  * 11.5;
    let hoursData = (24 - Math.floor( (difference % days) / hours ))  * 14.375;
    let minutesData = (60 - Math.floor( (difference % hours) / minutes ))  * 5.75;
    let secondsData = (60 - Math.floor( (difference % minutes) / seconds ))  * 5.75;
  
      
    dayEl.innerText = Math.floor(difference / days);
    hoursEl.innerText = Math.floor( (difference % days) / hours );
    minutesEl.innerText = Math.floor( (difference % hours) / minutes );
    secondsEl.innerText = Math.floor( (difference % minutes) / seconds ); 
    dayCircle.setAttribute('stroke-dasharray' , dayData +', ' + dasharrayEl); 
    hoursCircle.setAttribute('stroke-dasharray' , hoursData +', ' + dasharrayEl ); 
    minutesCircle.setAttribute('stroke-dasharray' , minutesData +', ' + dasharrayEl); 
    secondsCircle.setAttribute('stroke-dasharray' , secondsData +', ' + dasharrayEl); 
  
  }, seconds); 
}

