export default class Popup {
  private component: string = `<div
      class="dynamic-info-popup"
      style="
        background-color: #50c850;
        text-align: center;
        position: fixed;
        border-radius: 1rem;
        padding: 1rem;
        font-size: 1.2rem;
        margin: auto;
        top: 1.5rem;
        width: 20%;
        max-width: 20%;
        left: 40%;
      "
    >
      message
    </div>`;

  constructor(message: string, isError?: boolean) {
    const html = document.querySelector("html");
    const popup = document.createElement("div");
    this.component = this.component.replace("message", message);
    if (isError) {
      this.component = this.component.replace("#50c850", "#ff3232");
    }
    popup.innerHTML = this.component;
    html!.appendChild(popup);
    setTimeout(() => {
      html?.removeChild(popup);
    }, 4000);
  }
}
