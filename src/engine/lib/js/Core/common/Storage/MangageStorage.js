export class ManageStorage {
  constructor() {
    this.currentStorage = [];
    this.UI_body = document.getElementById("UI_body");
  }

  manage(target) {
    // debugger

    switch (target) {
      case "guides":
        if (localStorage.getItem("guides")) {
          localStorage.clear();
        }

        const allGuides = this.UI_body.querySelectorAll('[data-type="guides"]');
        this.currentStorage = [];

        allGuides.forEach((item) => {
          this.currentStorage.push(item.dataset);
        });
        localStorage.setItem("guides", JSON.stringify(this.currentStorage));

        break;
    }
  }
}
