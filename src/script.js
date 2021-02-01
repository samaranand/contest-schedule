let result, currentTime;

let running = document.getElementById("running-value");
let upcoming = document.getElementById("upcoming-value");
let in24hr = document.getElementById("in24hr-value");
let value = document.querySelectorAll(".value");

let dark_check = document.getElementById("dark-btn");

// working of dark btn

dark_check.addEventListener("click", () => {
  if (dark_check.value == "on") {
    dark_check.value = "off";
    document.body.className = document.body.className.replace(
      "darken-4",
      "lighten-3"
    );
    document.body.className = document.body.className.replace(
      "text-lighten-2",
      "text-darken-4"
    );
    value.forEach((e) => {
      e.classList.remove("darken-3");
      e.classList.add("lighten-2");
    });
  } else {
    dark_check.value = "on";
    document.body.className = document.body.className.replace(
      "lighten-3",
      "darken-4"
    );
    document.body.className = document.body.className.replace(
      "text-darken-4",
      "text-lighten-2"
    );
    value.forEach((e) => {
      e.classList.remove("lighten-2");
      e.classList.add("darken-3");
    });
  }
});

function convertToHour(seconds) {
  let hr, mi, sc;
  hr = Math.floor(seconds / (60 * 60));
  seconds = seconds % (60 * 60);
  mi = Math.floor(seconds / 60);
  seconds = seconds % 60;
  sc = seconds;
  return `${hr} Hrs ${mi} Mins ${sc} Seconds`;
}

function returnConverted(r) {
  const start_utcDate = r["start_time"];
  const end_utcDate = r["end_time"];
  const startDate = new Date(start_utcDate);
  const endDate = new Date(end_utcDate);
  // console.log(startDate.toDateString());
  const t = `<section class="section">
  <div class="col s12 m12 l12">
    <span class="platform flow-text left" id="name"
      ><a href="${r["url"]}">${r["name"]}</a></span
    >
  </div>
  <div class="col s12 m6 l6">
    <span class="platform flow-text left" id="platform"
      >${r["site"]}</span
    >
  </div>
  <div class="col s12 m6 l6" id="duration">
    <span class="platform flow-text left" id="duration"
      >${convertToHour(r["duration"])}</span
    >
  </div>
  <div class="col s6 m6 l6">
    <span><b>From - ${startDate.toDateString()}</b></span>
  </div>
  <div class="col s6 m6 l6">
    <span><b>To - ${endDate.toDateString()}</b></span>
  </div>
</section> <div class="col s12 m12 l12"><hr /></div>`;
  return t;
}

let running_count = 0,
  upcomin_count = 0,
  in24hr_count = 0;

let updateUI = function () {
  fetch("http://worldclockapi.com/api/json/utc/now")
    .then((res) => res.json())
    .then((d) => {
      currentTime = d["currentDateTime"];
    })
    .then(() => {
      result.forEach((r) => {
        // console.log(r['name']);

        if (r["start_time"] <= currentTime) {
          let v = returnConverted(r);
          if (running_count < 10) {
            running.insertAdjacentHTML("beforeend", v);
            running_count += 1;
          }
        } else {
          let v = returnConverted(r);
          if (upcomin_count < 10) {
            upcoming.insertAdjacentHTML("beforeend", v);
            upcomin_count += 1;
          }
        }
        if (r["in_24_hours"] === "Yes") {
          let v = returnConverted(r);
          if (in24hr_count < 10) {
            in24hr.insertAdjacentHTML("beforeend", v);
            in24hr_count += 1;
          }
        }
      });
    });
};

let initFun = function () {
  fetch("https://kontests.net/api/v1/all")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      result = data;
      updateUI();
    });
};

initFun();

// materialize-css-js

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".scrollspy");
  var instances = M.ScrollSpy.init(elems);
  console.log("samar");
});
