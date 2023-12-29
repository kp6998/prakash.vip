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

  function processInput(){
    var field1Value = $("#field1").val();
    var field2Value = $("#field2").val();
    alert("Field 1: " + field1Value + "\nField 2: " + field2Value);
    $("#customPrompt").css("display", "none");
  }