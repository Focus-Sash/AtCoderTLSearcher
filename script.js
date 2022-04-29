window.addEventListener("load", () => {
  //コンテスト終了後から何時間分のツイートを表示するか
  const timeRange = 2;

  //「話題のツイート」タブで開くならfalse, 「最新」タブで開くならtrue;
  const showLiveTweet = true;
  
  // コンテストの終了時間を取得し、AtCoder TLへのリンクを生成する

  // リンクに埋め込むコンテストの終了時間を生成する
  const contestFinishDateString = document.getElementsByTagName("time")[1].textContent;
  const searchRangeStart = new Date(contestFinishDateString);
  const startDateString = searchRangeStart.toLocaleDateString("jp-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const startTimeString = searchRangeStart.toLocaleTimeString("jp-JP");
  const startYear = startDateString.slice(0, 4);
  const startMonth = startDateString.slice(5, 7);
  const startDay = startDateString.slice(8, 10);

  const startHour = startTimeString.slice(0, 2);
  const startMinute = startTimeString.slice(3, 5);
  
  let searchString = "%20since%3A";
  searchString += startYear + "-" + startMonth + "-" + startDay + "_";
  searchString += startHour + "%3A" + startMinute + "_JST%20until%3A";
  

  const searchRangeEnd = searchRangeStart;
  searchRangeEnd.setHours(searchRangeEnd.getHours() + timeRange);

  const endDateString = searchRangeEnd.toLocaleDateString("jp-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const endTimeString = searchRangeEnd.toLocaleTimeString("jp-JP");

  console.log(endDateString);
  
  const endYear = endDateString.slice(0, 4);
  const endMonth = endDateString.slice(5, 7);
  const endDay = endDateString.slice(8, 10);

  const endHour = endTimeString.slice(0, 2);
  const endMinute = endTimeString.slice(3, 5);
  
  searchString += endYear + "-" + endMonth + "-" + endDay + "_";
  searchString += endHour + "%3A" + endMinute + "_JST&src=typed_query";
  

  const listIdArray = [
    "1265268852528566273",
    "1265268943393943554",
    "1265269023278690304",
    "1265269077888479235",
    "1265269135493099526",
    "1265269191877124101",
    "1265269251641761793",
    "1265269317169340417"
  ];

  let linkArray = Array(8).fill("https://twitter.com/search?q=list%3A"); 
  for (let i = 0; i < 8; ++i) {
    linkArray[i] += listIdArray[i] + searchString;
    if (showLiveTweet) {
      linkArray[i] += "&f=live";
    }
  }

  const tab = document.getElementsByClassName("nav nav-tabs");

  const twitterIcon = document.createElement("img");

  const menu = document.createElement("ul");
  menu.className = "dropdown-menu";


  // let linkArray = [
  //   "https://twitter.com/i/lists/1265268852528566273",
  //   "https://twitter.com/i/lists/1265268943393943554",
  //   "https://twitter.com/i/lists/1265269023278690304",
  //   "https://twitter.com/i/lists/1265269077888479235",
  //   "https://twitter.com/i/lists/1265269135493099526",
  //   "https://twitter.com/i/lists/1265269191877124101",
  //   "https://twitter.com/i/lists/1265269251641761793",
  //   "https://twitter.com/i/lists/1265269317169340417"
  // ];

  let iconPathArray = [
    "icon/red.svg",
    "icon/orange.svg",
    "icon/yellow.svg",
    "icon/blue.svg",
    "icon/cyan.svg",
    "icon/green.svg",
    "icon/brown.svg",
    "icon/gray.svg",
  ]

  let colorNameArray = [
    " Red", 
    " Orange",
    " Yellow",
    " Blue",
    " Cyan",
    " Green",
    " Brown",
    " Gray"
  ]

  const menuContent = document.createElement("li");

  for (let i = 0; i < 8; ++i) {
    const link = document.createElement("a");
    link.href = linkArray[i];
    const colorIcon = document.createElement("img");
    colorIcon.src = chrome.runtime.getURL(iconPathArray[i]);
    link.append(colorIcon);
    link.append(document.createTextNode(colorNameArray[i]));
    menuContent.append(link);
  }

  menu.append(menuContent);



  twitterIcon.src = chrome.runtime.getURL("icon/twitter.svg");

  const dropDownMenu = document.createElement("a");

  const menuDiscription = document.createTextNode(" AtCoder TL");
  
  const caret = document.createElement("span");
  caret.className = "caret";

  dropDownMenu.append(twitterIcon);
  dropDownMenu.append(menuDiscription);
  dropDownMenu.append(caret);


  const newTab = document.createElement("li");

  dropDownMenu.className = "dropdown-toggle";
  dropDownMenu.setAttribute("data-toggle", "dropdown");
  dropDownMenu.href = "#";
  dropDownMenu.setAttribute("role", "button");
  dropDownMenu.setAttribute("aria-haspopup", "true");
  dropDownMenu.setAttribute("aria-expanded", "false");

  newTab.append(dropDownMenu);

  newTab.append(menu);


  let lastChild = tab[0].getElementsByClassName("pull-right");

  tab[0].insertBefore(newTab, lastChild[0]);
})