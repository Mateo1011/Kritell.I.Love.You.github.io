const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (event)=>{
   const xPosition = event.offsetX
   const ypoistion = event.offsetY
   const spanEl = document.createElement("span");

   spanEl.style.left = xPosition + "px";
   spanEl.style.top = ypoistion + "px";

   const size = Math.random()*100;
   spanEl.style.width = size + "px";
   spanEl.style.height = size + "px";

   bodyEl.appendChild(spanEl);

   setTimeout(()=>{
    spanEl.remove();
   }, 3000);
});