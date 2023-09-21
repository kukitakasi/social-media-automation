var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AutoMediaPost");
var pageIdFB = sheet.getRange('N14').getValue();
var accessTokenFB = sheet.getRange('O14').getValue();
var pageIdIG = sheet.getRange('L14').getValue();
var accessTokenIG = sheet.getRange('M14').getValue();
var message = sheet.getRange('A7').getValue();
var oneMedia = sheet.getRange('D14').getValue();
var req = sheet.getRange('E14').getValue();
var media1 = "Instagram";
var request = "Na";
var linkUrl1 = sheet.getRange('C14').getValue();
var linkUrl2 = sheet.getRange('C15').getValue();
var linkUrl3 = sheet.getRange('C16').getValue();
var linkUrl4 = sheet.getRange('C17').getValue();
var linkUrl5 = sheet.getRange('C18').getValue();
var linkUrl6 = sheet.getRange('C19').getValue();
var linkUrl7 = sheet.getRange('C20').getValue();
var linkUrl8 = sheet.getRange('C21').getValue();
var linkUrl9 = sheet.getRange('C22').getValue();
var linkUrl10 = sheet.getRange('C23').getValue();

function carouselTen (){

  if(media1 == oneMedia && req == request){
  createCarouselPostTen();
    Utilities.sleep(1000);
    var ui = SpreadsheetApp.getUi();
    ui.alert("Successfully Image Carousel Added");
  }
}
function createCarouselPostTen() {

  var mediaItems = [];

  // Add items conditionally based on your requirements
  if (linkUrl1!=='') {
    mediaItems.push({
      image_url: linkUrl1,
      is_carousel_item: true,
    });
  }
   if (linkUrl2!=='') {
    mediaItems.push({
      image_url: linkUrl2,
      is_carousel_item: true,
    });
  }
     if (linkUrl3!=='') {
    mediaItems.push({
      image_url: linkUrl3,
      is_carousel_item: true,
    });
  }
     if (linkUrl4!=='') {
    mediaItems.push({
      image_url: linkUrl4,
      is_carousel_item: true,
    });
  }
     if (linkUrl5!=='') {
    mediaItems.push({
      image_url: linkUrl5,
      is_carousel_item: true,
    });
  }
     if (linkUrl6!=='') {
    mediaItems.push({
      image_url: linkUrl6,
      is_carousel_item: true,
    });
  }
     if (linkUrl7!=='') {
    mediaItems.push({
      image_url: linkUrl7,
      is_carousel_item: true,
    });
  }
     if (linkUrl8!=='') {
    mediaItems.push({
      image_url: linkUrl8,
      is_carousel_item: true,
    });
  }
     if (linkUrl9!=='') {
    mediaItems.push({
      image_url: linkUrl9,
      is_carousel_item: true,
    });
  }
     if (linkUrl10!=='') {
    mediaItems.push({
      image_url: linkUrl10,
      is_carousel_item: true,
    });
  }

  var itemContainerIds = [];
  for (var i = 0; i < mediaItems.length; i++) {
    var item = mediaItems[i];
    var response = UrlFetchApp.fetch(
      'https://graph.facebook.com/v17.0/' + pageIdIG + '/media',
      {
        method: 'POST',
        payload: {
          access_token: accessTokenIG,
          ...item,
        },
      }
    );
    var result = response.getContentText();
    var resultObj = JSON.parse(result);
    if (resultObj.id) {
      itemContainerIds.push(resultObj.id);
    } else {
      console.error('Media item creation failed:', resultObj);
    }
  }

  // carousel container
  var carouselData = {
    media_type: 'CAROUSEL',
    caption: message, 
    children: itemContainerIds.join(','),
    access_token: accessTokenIG,
  };

  var carouselResponse = UrlFetchApp.fetch(
    'https://graph.facebook.com/v17.0/' + pageIdIG + '/media',
    {
      method: 'POST',
      payload: carouselData,
    }
  );
  var carouselResult = carouselResponse.getContentText();
  var carouselResultObj = JSON.parse(carouselResult);
  var crContainer = carouselResultObj.id;
  if (carouselResultObj.id) {
    console.log('Carousel container created:', carouselResultObj);
  }
   Utilities.sleep(2000);
    retrycarouselPublish(crContainer);
}
//execution program start here
function carouselPublish(crContainer) {

    var url = "https://graph.facebook.com/" + pageIdIG + "/media_publish";
    var payload = {
    creation_id: crContainer,
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
function retrycarouselPublish(crContainer) {
  var maxRetries = 5; 
  var retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      carouselPublish(crContainer); // Call the postinstagrama function
      Logger.log("Second function called after retry.");
      break; 
    } catch (error) {
      Logger.log("Error in postinstagrama function: " + error);
      retryCount++;
      Utilities.sleep(2000); 
    }
  }
}
