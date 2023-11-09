function onOpen() {
  createMenuWithSubMenu();
}

function createMenuWithSubMenu() {
  var advanceMenu = SpreadsheetApp.getUi().createMenu("(ง •̀_•́)ง   Λｄｖａｎｃｅ")
    .addItem("Setting D", "settingD")
    .addItem("Setting E", "settingE");
  var liSubMenu = SpreadsheetApp.getUi().createMenu("💠 🇱 🇮")
    .addItem("➤【﻿Ｓｉｍｐｌｅ　Ｐｏｓｔ】", "liSimplePost")
    .addItem("➤【﻿Ｐｏｓｔ　ｗｉｔｈ　Ｌｉｎｋ】", "liArticlePost")
    .addItem("➤【﻿Ｐｏｓｔ　ｗｉｔｈ　Ｉｍａｇｅ】", "settingD");
  
  SpreadsheetApp.getUi().createMenu("ε(´｡•᎑•`)っ 💕")
    .addItem("🧪 🇫 🇧", "settingA")
    .addSeparator()
    .addItem("🐾 🇮 🇬", "settingB")
    .addSeparator()
    .addSubMenu(liSubMenu)
    .addSeparator()
    .addSubMenu(advanceMenu)
    .addToUi();
}

function settingA() {
  SpreadsheetApp.getActive().toast("You selected Setting A.");
}

function settingB() {
  SpreadsheetApp.getActive().toast("You selected Setting B.");
}

function settingC() {
  SpreadsheetApp.getActive().toast("You selected Setting C.");
}

function settingD() {
  SpreadsheetApp.getActive().toast("You selected Setting D.");
}

function settingE() {
  SpreadsheetApp.getActive().toast("You selected Setting E.");
}
// linkedIn automation start here for simple text post
function liSimplePost() {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Linked IN");
  let pageIdLi = ss.getRange('I2').getValue();
  let accessTokenLi = ss.getRange('J2').getValue();
  let liMessege = ss.getRange('A7').getValue();
  if (liMessege != ""){
    const apiUrl = 'https://api.linkedin.com/v2/ugcPosts';

    var headers = {
      'Authorization': 'Bearer ' + accessTokenLi,
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type' : 'application/json'
    };
    // this payload for simple text only post
    let payload = {
      author: "urn:li:person:"+pageIdLi,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: liMessege
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    var options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch(apiUrl, options);

    if (response.getResponseCode() === 201) {
      Logger.log('LinkedIn post created successfully.');
        let postData = JSON.parse(response.getContentText());
        Logger.log(postData.id);
        ss.getRange("H2").setValue(postData.id);
        SpreadsheetApp.getActive().toast("Post successfully created: " + postData.id);
    }   else {
            Logger.log('Error creating LinkedIn post. Response code: ' + response.getResponseCode());
        }
    }
  else {
    var ui = SpreadsheetApp.getUi();
    ui.alert("Please Fill Your Summery");
    }
}
// linkedIn automation start here for article post
function liArticlePost() {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Linked IN");
  let pageIdLi = ss.getRange('I2').getValue();
  let accessTokenLi = ss.getRange('J2').getValue();
  let liMessege = ss.getRange('A7').getValue();
  let liLinkUrl = ss.getRange('B2').getValue();
  
  if (liLinkUrl != "" && liMessege != ""){
    const apiUrl = 'https://api.linkedin.com/v2/ugcPosts';
    let liPostType = "ARTICLE";

    var headers = {
    'Authorization': 'Bearer ' + accessTokenLi,
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type' : 'application/json'
    };
    let payload2 = {
      author: "urn:li:person:"+'VYTl-j98_b',
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
                text: liMessege
            },
            shareMediaCategory: "ARTICLE",
            media: [
                {
                    status: "READY",
                    description: {
                        text: ""
                    },
                    originalUrl: liLinkUrl,
                    title: {
                        "text": "Visit Now"
                    }
                }
            ]
        }
    },
    visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': "PUBLIC"
    }
    }

    // this payload for simple text post
    let payload1 = {
      author: "urn:li:person:"+pageIdLi,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: 'Hii There!'
          },
        shareMediaCategory: 'NONE'
        }
      },
      visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };
    let postType;
      if (liPostType == 'ARTICLE') {
      postType = payload2;
      } else {
      postType = payload1;
      }
    var options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(postType)
    };
    var response = UrlFetchApp.fetch(apiUrl, options);
    if (response.getResponseCode() === 201) {
      Logger.log('LinkedIn post created successfully.');
        let postData = JSON.parse(response.getContentText());
      Logger.log(postData.id);
      SpreadsheetApp.getActive().toast("Post Successfully Created: " + postData.id);
      ss.getRange("H2").setValue(postData.id);

    } else {
      Logger.log('Error creating LinkedIn post. Response code: ' + response.getResponseCode());
    }
  }
  else {
     var ui = SpreadsheetApp.getUi();
  ui.alert("Please Fill Your Summery and Link URL");
  }
}

