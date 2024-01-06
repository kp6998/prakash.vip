  $(document).ready(function() {
    $('.language').click(function() {
      var textContent = $(this).text();
      const textRWS = "I can Read, Write and Speak ";
      alert(textRWS + (textContent == "English" ? textContent : "Tamil"));
    });

    $('.optDiv').click(function() {
      $('#searchTextBox').val($(this).find('.opt').text());
      var siteValue = $(this).find('.opt').data('site');
      OpenLink(siteValue);
    });

    $('#searchTextBox').on('focus', function() {
      $('.search').addClass('typing');
      $('.searchOpt').removeClass('d-none');
    }).on('blur', function() {
      $('#searchTextBox').val('');
      setTimeout(function() {
        $('.search').removeClass('typing');
        $('.searchOpt').addClass('d-none');
        $('.optDiv').show();
        $('#noMatchMessage').addClass('d-none');
      }, 200);
    });

    $('#searchTextBox').on('input', function() {
      var searchText = $(this).val().toLowerCase();
      validInput = false;
      $('.optDiv').each(function() {
        var optText = $(this).find('.opt').text().toLowerCase();
        if (optText.includes(searchText)) {
          $(this).show();
          validInput = true;
        } else {
          $(this).hide();
        }
      });
      $('#noMatchMessage').toggleClass('d-none', validInput);
    });

    $('.openApps').click(function (e) {
      e.stopPropagation();
      $('.appsContainer').toggleClass('d-none');
      $('.profileContainer').addClass('d-none');
    });
    $('.openProfile').click(function (e) {
      e.stopPropagation();
      $('.profileContainer').toggleClass('d-none');
      $('.appsContainer').addClass('d-none');
    });
    $(document).on('click', function (e) {
      if (!$('.appsContainer').is(e.target) && !$('.appsContainer').has(e.target).length) {
        $('.appsContainer').addClass('d-none');
      }
      if (!$('.profileContainer').is(e.target) && !$('.profileContainer').has(e.target).length) {
        $('.profileContainer').addClass('d-none');
      }
    });

    $('.reqResume').click(function(){
      $("#customPrompt").css("display", "flex");
    });

    $('.btnCancel').click(function(){
      $("#customPrompt").css("display", "none");
    });

    $('#btnSearch').click(function(){
      if($("#searchTextBox").val() == "") return;
      const siteValue = $("#searchTextBox").data('site');
      OpenLink(siteValue);
    });

  });

  function OpenLink(siteValue){
    var link, bool = true;
    sessionStorage.setItem("optTabRef", siteValue);
    $('#searchTextBox').data('site', siteValue);
    switch (siteValue) {
      case 'in':
        link = "https://www.linkedin.com/in/prakash-vip";
        break;
      case 'git':
        link = "https://github.com/kp6998";
        break;
      case 'ig':
        link = "https://www.instagram.com/blah_blah_biker";
        break;
      case 'x':
        link = "https://twitter.com/blah_blah_biker";
        break;
      case 'yt':
        link = "https://www.youtube.com/@Prakash_VIP";
        break;
      default:
        link = "";
        bool = false;
    }
    if (bool) window.open(link, '_blank');
    else window.location.href = "/SearchPage";
  }
  
  var firebaseConfig = {
    databaseURL: "https://prakash-vip-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  database.ref('/Visitors/' + new Date().toLocaleDateString().replace(/\//g, '-') + "/" + new Date().toLocaleTimeString()).set(/android|iphone|kindle|ipad/i.test(navigator.userAgent) ? "Mobile" : "Computer");

  function processInput(){
    var fullname = $("#fullname").val();
    var email = $("#email").val();
    var reason = $("#reason").val();
    if (fullname == "") {
      alert('Please enter a valid name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (reason == "") {
      alert('Please enter a valid reason.');
      return;
    }
    var dataToSave = {
      fullname: fullname,
      email: email,
      reason: reason,
    };
    var dataRef = database.ref('/ResumeReq/' + new Date().toLocaleDateString().replace(/\//g, '-') + "/" + new Date().toLocaleTimeString());

    dataRef.set(dataToSave)
    .then(function() {
      $("#customPrompt").css("display", "none");
      $('#name, #email, #reason').val('');
      const cv = 'https://firebasestorage.googleapis.com/v0/b/prakash-vip.appspot.com/o/pk_cv.pdf?alt=media&token=6796b4e5-04c0-4797-b58a-8c3081bd0723';
      window.open(cv, '_blank');
    })
    .catch(function(error) {
      alert('Error saving data:', error);
    });

  }


  