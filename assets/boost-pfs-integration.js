var boostPFSIntegrationTemplate = {
     compileTemplate: {
       reviews: "var itemReviewsHtml = '';if (Utils.getProductMetafield(data, 'judgeme', 'badge') !== null) {   itemReviewsHtml += \"<div class='jdgm-widget jdgm-preview-badge' data-id='\" + data.id + \"'>\" + Utils.getProductMetafield(data, 'judgeme', 'badge') + \"</div>\";}itemHtml = itemHtml.replace(/{{itemReviews}}/g, itemReviewsHtml);"
     },
     call3rdFunction: {
       reviews: ''
     }
   };