var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("your sheet name");
var pageIdFB = sheet.getRange('N2').getValue();
var accessTokenFB = sheet.getRange('O2').getValue();
var pageIdIG = sheet.getRange('L2').getValue();
var accessTokenIG = sheet.getRange('M2').getValue();
var oneUrl = sheet.getRange('C2').getValue();
var message = sheet.getRange('A7').getValue();
var type = sheet.getRange('B2').getValue();
var oneMedia = sheet.getRange('D2').getValue();
var req = sheet.getRange('E2').getValue();
var type1 = "Image";
var type2 = "Video";
var type3 = "Reels";
var type4 = "ImgStory";
var type5 = "VidStory";
var media1 = "Facebook";
var media2 = "Instagram";
var media3 = "Both";
var request = "Na";
function aioTest (){

  // Facebook Condition Start Here

  if(type == type1 && media1 == oneMedia && req == request){
  fbimga();
    Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Image Added");
  }
  else if(type ==type2 && media1 == oneMedia && req == request){
  fbvida();
  Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Video Added");
  }
  else if (type == type3 && media1 == oneMedia && req == request){
  fbreela();
  }
  else if (type == type4 && media1 == oneMedia && req == request){
  fbimgstory();
  }
  else if (type == type5 && media1 == oneMedia && req == request){
  fbvidstory();
  }
  // Instagram Condition Start Here

  else if(type == type1 && media2 == oneMedia && req == request){
  igimga();
  Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Image Posted");
  }
  else if(type ==type2 && media2 == oneMedia && req == request){
   igvida();
   Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Video Posted");
  }
  else if (type == type3 && media2 == oneMedia && req == request){
  igreela();
  Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Reels Shared");
  }
  else if (type == type4 && media2 == oneMedia && req == request){
  igimgstory();
  Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Image Story Added");
  }
  else if (type == type5 && media2 == oneMedia && req == request){
  igvidstory();
  Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Video Story Added");
  }

  // Both Condition Start Here

  else if(type == type1 && media3 == oneMedia && req == request){
    fbimga();
    Utilities.sleep(1500);
    igimga();
    Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Image Posted on IG & FB");
  }
  else if(type ==type2 && media3 == oneMedia && req == request){
    fbvida();
    Utilities.sleep(1500);
    igvida();
      Utilities.sleep(1000);
  var ui = SpreadsheetApp.getUi();
  ui.alert("Successfully Video Added on IG & FB");
  }
  else if (type == type3 && media3 == oneMedia && req == request){
    fbreela();
    Utilities.sleep(1500);
    igreela();
  
  }
  else if (type == type4 && media3 == oneMedia && req == request){
    fbimgstory();
    Utilities.sleep(1500);
    igimgstory();
  }
  else if (type == type5 && media3 == oneMedia && req == request){
    fbvidstory();
    Utilities.sleep(1500);
    igvidstory();
  }

}
  // Facebook Image Post Function
function fbimga() {

  var url = "https://graph.facebook.com/" + pageIdFB + "/photos";
  var payload = {
    access_token: accessTokenFB,
    url: oneUrl,
    message: message
  };

  var options = {
    method: "post",
    payload: payload
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  Logger.log("Post ID: " + responseData.id);
  sheet.getRange("J2").setValue(responseData.id);

}
  // Facebook Video Post Function
function fbvida() {

  var url = "https://graph.facebook.com/" + pageIdFB + "/videos";
  var payload = {
    access_token: accessTokenFB,
    file_url: oneUrl, 
    description: message 
  };

  var options = {
    method: "post",
    payload: payload
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  Logger.log("Video Post ID: " + responseData.id);
  sheet.getRange("J2").setValue(responseData.id); 

}
function fbreela() {
  let valueToWrite = "sorry this featured isn't available";
  sheet.getRange("J2").setValue(valueToWrite);
  
}
function fbimgstory() {
  let valueToWrite = "sorry this featured isn't available";
  sheet.getRange("J2").setValue(valueToWrite);

    
}
function fbvidstory() {
  let valueToWrite = "sorry this featured isn't available";
  sheet.getRange("J2").setValue(valueToWrite);
  
}

function igimga() {
  var url = "https://graph.facebook.com/" + pageIdIG + "/media";
  var payload = {
    image_url: oneUrl,
    caption: message,
    access_token: accessTokenIG
  };

  var options = {
    method: "post",
    payload: payload
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  Logger.log("Post ID: " + responseData.id);

  let crId = responseData.id;
  Utilities.sleep(1000);
  var valueToWrite = responseData.id; 
    sheet.getRange("H2").setValue(valueToWrite);
  Utilities.sleep(1000);
  retryPostInstagrama(crId);
  
}
function igvida() {
  var url = "https://graph.facebook.com/" + pageIdIG + "/media?media_type=VIDEO";
    var payload = {
    video_url: oneUrl,
    caption: message,
    access_token: accessTokenIG
    };

    var options = {
    method: "post",
    payload: payload
    };
  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  Logger.log("Post ID: " + responseData.id);
  Utilities.sleep(1000);
  var crId = responseData.id;
    sheet.getRange("H2").setValue(crId);
  Utilities.sleep(5000);
  retryPostInstagrama(crId);
  
}
function igreela() {
  var url = "https://graph.facebook.com/" + pageIdIG + "/media?media_type=REELS";
    var payload = {
    video_url: oneUrl,
    caption: message,
    share_to_feed: "false",
    //product_tags: producttags,
    access_token: accessTokenIG
    };

    var options = {
    method: "post",
    payload: payload
    };

    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    Logger.log("Post ID: " + responseData.id);
    Utilities.sleep(1000);
    let crId = responseData.id;
    var valueToWrite = responseData.id; 
    sheet.getRange("H2").setValue(valueToWrite);
    Utilities.sleep(5000);
    retryPostInstagrama(crId);
  
}
function igimgstory() {
  var url = "https://graph.facebook.com/" + pageIdIG + "/media";
    var payload = {
    image_url: oneUrl,
    media_type: "STORIES",
    access_token: accessTokenIG
    };

    var options = {
    method: "post",
    payload: payload
    };

    var response = UrlFetchApp.fetch(url, options);
    var responseData = JSON.parse(response.getContentText());
    Logger.log("Post ID: " + responseData.id);
     Utilities.sleep(1000);
    let crId = responseData.id;
    var valueToWrite = responseData.id; 
    sheet.getRange("H2").setValue(valueToWrite);
    Utilities.sleep(1000);
    retryPostInstagrama(crId);

    
}
function igvidstory() {
  var url = "https://graph.facebook.com/" + pageIdIG + "/media";
  var payload = {
    video_url: oneUrl,
    media_type: "STORIES",
    access_token: accessTokenIG
  };

  var options = {
    method: "post",
    payload: payload
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  Logger.log("Post ID: " + responseData.id);
     Utilities.sleep(1000);
    let crId = responseData.id;
    var valueToWrite = responseData.id; 
    sheet.getRange("H2").setValue(valueToWrite);
    Utilities.sleep(5000);
    retryPostInstagrama(crId);
  
}
//execution program start here
function postinstagrama(crId) {

    Utilities.sleep(5000);
    var url = "https://graph.facebook.com/" + pageIdIG + "/media_publish";
    var payload = {
    creation_id: crId,
    access_token: accessTokenIG};
    var options = {
    method: "post",
    payload: payload
   };

  var response = UrlFetchApp.fetch(url, options);
  var responsedata = JSON.parse(response.getContentText());
  Logger.log("Publish Id: " + responsedata.id);
     var valueToWrite = responsedata.id; 
  sheet.getRange("I2").setValue(valueToWrite);

}

//retry execution program start here
function retryPostInstagrama(crId) {
  var maxRetries = 5; 
  var retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      postinstagrama(crId); // Call the postinstagrama function
      Logger.log("Second function called after retry.");
      break; 
    } catch (error) {
      Logger.log("Error in postinstagrama function: " + error);
      retryCount++;
      Utilities.sleep(2000); 
    }
  }
}
