const items = document.querySelectorAll(".accordion a");

function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach(item => item.addEventListener('click', toggleAccordion));



  $('#dropDown').click(function(){
    $('.drop-down').toggleClass('drop-down--active');
  });

  $(document).mouseup(function (e) { 
      if ($(e.target).closest(".search-wrap").length 
                  === 0) { 
          $('.search-wrap').removeClass('active');
      }


      if ($(e.target).closest("#dropDown").length 
                  === 0) { 
          $('.drop-down').removeClass('drop-down--active');
      } 
  }); 
  
  
  $(".faq-show , .fq-show").click(function() {
    $(".faq-show , .fq-show").removeClass('active');
    $(this).addClass('active');
    $('.faq-container').removeClass('d-block');
    $('.faq-container').addClass('d-none');
    
    $('.faq-container[data-faqc=' + $(this).data('faq') + ']').addClass('d-block');

    $(".drop-down__name").text( $(this).text() );
  });


$(document).on("click", "li", function() {
	
	var numberIndex = $(this).index();
    $('.faq-show').removeClass('active');
	$('#faqshow'+numberIndex).addClass('active');
	$('#faqc0').removeClass('d-block');
	$('.faq-container').addClass('d-none');
 $('#faqc'+numberIndex).removeClass('d-none'); 
});


var faqDump = {"0":[{"title":"Where can I find Nilkamal store?","section_title":"Popular","content":"Its easy to locate our store:) please click on the link mentioned below <a class='store_link' href=\"https:\/\/www.nilkamalfurniture.com\/pages\/store-locator\/\">https://www.nilkamalfurniture.com/pages/store-locator<\/a>"},{"title":"How can i place a bulk order and is there any discount available?","section_title":"Popular","content":"You can chat with us by clicking on the chat icon on the right handside bottom of your page or you can reach us at furniture.enquiry@nilkamal.com, or call us on 1800-1219-115 for further details"},{"title":"What are the benefits of registering with Nilkamal?","section_title":"Popular","content":"When you register with us, we provide you regular updates regarding new product launches, new design arrivals, offers, and discounts."},{"title":"What do I do if a coupon issued by Nilkamal is not working?","section_title":"Popular","content":"Your coupon may not be working because of any of the following reasons: <br>• The validity of the coupon may have expired.<br>• The coupon may have already been used.<br>• The coupon may not be applicable on certain items<br>• The coupon will not work if the Shopping Cart Value is less than the value required for the coupon to be applicable.<br>• The coupon may be linked to a different user account. Login to the correct user account for availing it.<br>• Incase of any assistance required you can chat with us or reach us at furniture.enquiry@nilkamal.com, or call us on 1800-1219-115."}],"Account related":[{"title":"How to create my account on Nilkamal?","section_title":"Account related","content":"It’s easy to create an account with Nilkamal, you can simply Sign Up or login with your social profile.<br>Setting up your account via Sign Up is as easy as:<br>Click 'Sign Up' at the top of the page. Enter your name and email address in the box that pops up. Create a password. Click 'Sign Up'.<br>Login via social profile is as easy as:<br>Click 'Sign In' at the top of the page. Click 'Sign In' with Facebook. Click 'OK' on the permission dialog box that appears on your Facebook page. Nilkamal will use your Facebook details to create your furniture.enquiry@nilkamal.com.<br>Nilkamal, Let’s make life beautiful!."},{"title":"I forgot my Nilkamal login password, what to do next?","section_title":"Account related","content":"There is a possibility that you must have forgotten your password, the solution is easy - go to My Account page and click on the Forgot password link. You will be prompted with a window, enter your registered email address. A link to reset your password will automatically be sent to you."},{"title":"Can I buy from www.nilkamal.com as a guest user or without creating an account?","section_title":" Account related","content":"Yes, you can purchase using your social media login or through guest login. However,if you create an account with us, it will be easier for you to shop with us the next time using your login id (your email address) and password. All your personal information will be automatically retrieved from your account."},{"title":"How do I change my Personal information?","section_title":"Account related","content":"Simply go to My Account page, login and you can modify your account details there. Incase of any help required please send us an email to furniture.enquiry@nilkamal.com"}],"Order related":[{"title":"How do i track progress of an order?","section_title":"Order related","content":"Once your order has been shipped, you will receive an email and an SMS notification with its details. You can track the shipment by clicking on the link provided in the email.<br>You can also track your order by visiting www.nilkamal.com and clicking on the 'Track Order' link located in the upper right-hand corner of the website. From there, you can either log in or type in your 'Order Number' to get tracking."},{"title":"Can I change my delivery date?","section_title":"Order related","content":"Sorry, we do not allow rescheduling of orders through our website. You can contact our helpline for further assistance."},{"title":"Can I change my mobile number or shipping address?","section_title":"Order related","content":"Please get in touch with our Customer Care at furniture.enquiry@nilkamal.com. We'll try our best to assist you."},{"title":"How can I know the availability timelines of a product that is Out of stock?","section_title":"Order related","content":"We regularly update our product range with new items, but every once in a while, you may miss out on something. Enter your email address in the Notify Me box next to the product, and you'll be the first to know when it's back in stock."},{"title":"How and When can I cancel my order?","section_title":"Order related","content":"If you change your mind after placing an order, you can cancel the order (or part of the order) within 24 hrs of the order confirmation, or before it is shipped, whichever is earlier."},{"title":"Can I place a B2B order?","section_title":"Order related","content":"Yes, you can. You need to add Business Details during checkout. Incase of Bulk orders, timeline may vary."}],"Shipping related":[{"title":"How do I check the delivery timelines before I place the order?","section_title":"Shipping related","content":"Enter your delivery pin code in the item page which will guide you through estimated timelines."},{"title":"Do you deliver to multiple addresses?","section_title":"Shipping related","content":"We only deliver at the specified shipping address mentioned in your order."},{"title":"How do I know the delivery services are available before I place the order?","section_title":"Shipping related","content":"Enter your delivery pin code in the item page to know whether it can be delivered to your address."},{"title":"Do you ship internationally?","section_title":"Shipping related","content":"As of now, Nilkamal doesn't ship items outside India.  However, Nilkamal does allow you to make purchases for your loved ones in India from anywhere in the world by using your international credit or debit cards issued in India. You need to ensure that the Shipping Address is in India."},{"title":"My purchase is a gift, can Nilkamal do a gift wrap  and send the order without an invoice?","section_title":"Shipping related","content":"We can consider gift wrapping only for household range however you need to contact us on the same day of purchase. Unfortunately, we cannot ship any product without an invoice. To comply with the rules governing the movement of goods in India, and due to tax and regulatory reasons all shipments have to be accompanied with an invoice."},{"title":"Why does the promised Delivery date vary from one item to the other?","section_title":"Shipping related","content":"The delivery time for an item is determined by various factors including the kind of product (standard product or made, to-order), location from where the item is procured, and logistic network available at your location. Hence, the delivery dates may vary from one item to the other."},{"title":"Are there any shipping/delivery charges?","section_title":"Shipping related","content":"We offer FREE SHIPPING for our furniture range however shipping charges are applicable on ODA(outside delivery area) pincodes. Household range can be purchased with nominal shipping charges (Rs.99/-) for orders below Rs.1000/"},{"title":"When will my product assembly happen? Do I need to contact anyone?","section_title":"Shipping related","content":"Once the order is delivered, sit back and relax. Our Installation partner will get in touch you and assembly will happen in 3 to 5 business days post delivery."}],"Payment related":[{"title":"What are my payment options?","section_title":"Payment related","content":"Nilkamal offers a wide range of payment options to accommodate every need and offer maximum flexibility. The following payment options are currently available on Nilkamal:<br>• Cash on Delivery<br>• Debit Card<br>• Credit Card<br>• Net Banking<br>• EMI<b>• UPI<br>• Wallets (Paytm, Mobikwik ,Freecharge, Jio Money, ICash Card, ICICI Pockets, Itz Cash Card, Oxygen, PayCash Card, The Mobile Wallet, Vodafone M – Pesa, XPay, Yes Bank)"},{"title":"What are the EMI options available","section_title":"Payment related","content":"Nilkamal offers you EMI facility. You can check on the product page the exact EMI amount for the product you wish to purchase."},{"title":"Does Nilkamal retain my card or account details?","section_title":"Payment related","content":"We do not collect or store your card or account details. Your transaction is authorized at multiple points, first by the payment gateway and subsequently by Visa/MasterCard/Banks directly without any information passing through us."},{"title":"What should I do if a transaction fails?","section_title":"Payment related","content":"Transactions could fail due to multiple reasons:<br>• Information passed on to payment gateway is inaccurate, i.e., account details, billing address, password (for net banking).<br>• Your Internet connection is disrupted in the process.<br>• If your account has been debited after a payment failure, it will be rolled back within seven working days.<br>Please direct all questions and further clarifications regarding the above statement to furniture.enquiry@nilkamal.com"},{"title":"Can I place a COD Order?","section_title":"Payment related","content":"Yes! You can place a COD order of upto Rs.5000/."},{"title":"Can I add my GST details on TAX invoice?","section_title":"Payment related","content":"Currently we are accepting only B2C orders hence we would not be able to add GST details on tax invoice."}],"Warranty and Returns":[{"title":"Can I return my order?","section_title":"Warranty and Returns","content":"We offer a 14-Day Return Policy for all products.<br>Returns are accepted only for the following reasons:<br>• Damaged Product<br>• Manufacturing Defect<br>• Incomplete Product<br>• Incorrect Product<br>The time frame starts from the date the product was delivered as per the confirmation received from our logistics team or courier partners.<br>Please send us 2 images (one of damaged part and one of the entire product) of the product to ascertain the reason for return which can be initiated from the 'contact us' Section or you can send us an email to furniture.enquiry@nilkamal.com or you can call us on 1800-1219-115.<br>We offer hassle-free returns through courier pickup or you can also request a replacement for the non furniture products online or at any of our stores. You do not have to bear any courier or shipping charges for returns.<br>All products bought online can only be returned in case of manufacturing defects or damaged product delivery or incorrect or incomplete. This needs to be brought to our notice (via phone / email / whatsapp) within 48 hours from the delivery / assembly date. To return furniture, you can reach us at furniture.enquiry@nilkamal.com, or call us on 1800-1219-115."},{"title":"When will I get the refund?","section_title":"Payment related","content":"Any refund against a return request made to Nilkamal customer support and collected by courier shall be processed only upon receipt of the merchandise in unused condition along with the original invoice.<br>After the merchandise is received and verified by Nilkamal we shall process a refund/replacement within 1-2 weeks of receipt of the merchandise.For remote locations or Tier 2/Tier 3 cities we may take additional time to process replacement request.<br>Refunds to the Cardholder’s credit card/debit card will only be credited back to his/her account which was used Refunds to the Cardholder’s credit card/debit card will only be credited back to his/her account which was used.<br>In case of COD order, Refund will be issued through cheque payment mode. Customer needs to send details that are required for cheque draft. COD refund is manual process hence it takes maximum 7-8 days to process cheque request. We recommend to opt for prepaid payment mode while placing an order for faster refund.<br>Please call at Toll Free # 1-800-121-1414 (10.00am-7.00pm IST; 6 days a week), email to furniture.enquiry@nilkamal.com for any queries or concerns about our returns and exchange policy."},{"title":"What warranty does Nilkamal have for its products?","section_title":"Payment related","content":"The warranty that we offer differs from product to product, based on the materials used. Please refer to the 'Specifications' tab in the Product Details section for warranty related information"},{"title":"Can I return a product in case I do not want it or do not like it?","section_title":"Payment related","content":"Item cannot be refunded for any reasons other than following: Damage / dead on arrival, Manufacturing defect/Expired product & In-correct product."}]};
var stopwords = ["a", '?' ,"about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

function remove_stopwords(str) {
    res = []
    words = str.split(' ')
    for(i=0;i<words.length;i++) {
       word_clean = words[i].split(".").join("")
       if(!stopwords.includes(word_clean)) {
           res.push(word_clean)
       }
    }
    return(res.join(' '))
}  

function Compare(strA,strB){
  strA = strA.replace(/[^a-zA-Z ]/g, "");
  strB = strB.replace(/[^a-zA-Z ]/g, "");

  question = strA.split(" ");
  search_term = strB.split(" ");


  wordsMatched = 0 ;

  search_term.forEach((wordA) => {
    
    question.forEach((wordB) => {
      
      if(wordB.includes(wordA)){
        wordsMatched++ ;
      }
    

    });  


  });


  return Math.abs( Math.round(( wordsMatched / question.length ) *  100) ) ;

}

function reverseObject(object) {
  var newObject = {};
  var keys = [];

  for (var key in object) {
      keys.push(key);
  }

  for (var i = keys.length - 1; i >= 0; i--) {
    var value = object[keys[i]];
    newObject[keys[i]]= value;
  }       

  return newObject;
}

$('.faq-search-bar').on('keyup',function(){
    var search_term = $(this).val() ;
    

    if(search_term != ''){


      var allFaqs = [] ;
      Object.keys(faqDump).map((key) =>{

        let value = faqDump[key];
        Object.keys(value).map((item) => {
          let temp = value[item];
          
          allFaqs.push(temp);
        });

      });

      

      var search_results = [];
      allFaqs.map((item) => {
        
        let score = Compare( remove_stopwords(item.title.toLowerCase().replace('?', "")) , remove_stopwords(search_term.toLowerCase().replace('?', "")) ) ;
        if( score > 0){
          item.score = score ;
          search_results[score] = item ;
        }

      });


      $(".search-results").html('');
      var i = 0 ;



      search_results =  Object.entries(search_results).sort().reduce( (o,[k,v]) => (o[k]=v,o), {} )
      search_results =  Object.assign([], search_results).reverse();
console.log(search_results);


      Object.keys(search_results).forEach(key => {
        let currentItem = search_results[key];

        $(".search-results").append(`<div id="accordionfaq" class="panel-group faq col-12 col-md-12 accordion accordion1 accordionsearchbar accor_search"><div class="accordion-item"><div class="faq-container d-block" data-faqc="${i}">

        <a > ${currentItem.title}</a>
        <div class="content">
        ${currentItem.content}
        </div>
      </div></div></div>`);
        

        i++ ;
      });
      const items = document.querySelectorAll(".accordion1 a");

      function toggleAccordion(){
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('active');
      }
      
      items.forEach(item => item.addEventListener('click', toggleAccordion));
      $('.search-wrap').addClass('active');
    }else{
      $('.search-wrap').removeClass('active');
    }
  });




$('.accordion-item').click(function(){
	  $(this).find(a).addClass('active');
	  
  });
  $(document).mouseup(function (e) { 
  
  
      if ($(e.target).closest(".search-wrap").length 
                  === 0) { 
				  
				  $('.accor_search').remove();
      }


      if ($(e.target).closest("#dropDown").length 
                  === 0) { 
      } 
  }); 
