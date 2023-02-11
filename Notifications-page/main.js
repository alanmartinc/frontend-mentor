let count = document.getElementById("notif-count");

let notificationItem = [
  ...document.querySelectorAll(".container__notifications__item"),
];

let pointRed = [...document.querySelectorAll(".point__red")];

let totalNotif = notificationItem.length;

count.innerHTML = `${totalNotif}`;

let notifClick = 0;

notificationItem.forEach((item, index) => {
  item.style.background = "hsl(210, 60%, 98%)";

  item.addEventListener("click", () => {
    notifClick++;
    console.log(notifClick);

    item.style.background = "white";

    if (notifClick <= totalNotif) {
      count.innerHTML = `${totalNotif - notifClick}`;
      pointRed[index].style.display = "none";
    }
  });
});

let markAll = document.getElementById("seenAll");

markAll.addEventListener("click", () => {
  notificationItem.forEach((notif) => {
    notif.style.background = "white";
  });

  pointRed.forEach((point) => {
    point.style.display = "none";
  });
});
