if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}

import "./sass/engine.scss";
import { UI } from "./js/Core/common/UI/UI";
import { Guides } from "./js/Core/modules/Guides/Guides";

new UI();
new Guides();
