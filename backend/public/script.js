let ws;

class WebSocketMock {
  constructor(url) {
    this.url = url;

    this.pins = new Set();

    setTimeout(() => this.onopen());
    setInterval(() => {
      for (const pin of this.pins) {
        this.onmessage({ data: JSON.stringify({ pin, value: Math.random() * 100 }) });
      }
    }, 1000);
  }

  send(data) {
    const { pin } = JSON.parse(data);
    this.pins.add(pin);
  }
}

function startSensorRead() {
  const outputElements = document.querySelectorAll('[data-source="output"]');
  outputElements.forEach((element) => {
    const pin = element.getAttribute('data-pin');
    ws.send(JSON.stringify({ action: 'start', pin }));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('input[data-source="input"]');
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      const pin = this.getAttribute('data-pin');
      const value = this.value;
      fetch(`/update?pin=${pin}&value=${value}`)
        .then((response) => response.text())
        .then((data) => console.log(data));
    });
  });

  const radios = document.querySelectorAll('input[type="radio"][data-source="input"]');
  radios.forEach((radio) => {
    radio.addEventListener('change', function () {
      const pin = this.getAttribute('data-pin');
      const value = this.value;
      fetch(`/update?pin=${pin}&value=${value}`)
        .then((response) => response.text())
        .then((data) => console.log(data));
    });
  });

  ws = new WebSocketMock(`ws://${window.location.hostname}/ws`);
  ws.onopen = function () {
    startSensorRead();
  };
  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const outputElements = document.querySelectorAll(
      `[data-source="output"][data-pin="${data.pin}"]`
    );
    outputElements.forEach((element) => {
      element.textContent = parseInt(data.value) || `Sensor on GPIO-${data.pin} disconnected`;
    });
  };
});
