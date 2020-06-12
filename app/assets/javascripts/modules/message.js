$(function(){

  function buildHTML(message){
    if (message.image) {
      let html =
      `<div class="One-message" data-message-id=${message.id}>
        <div class="One-message__prof">
          <div class="One-message__prof--name">
            ${message.user_name}
          </div>
          <div class="One-message__prof--time">
            ${message.created_at}
          </div>
        </div>
        <div class="One-message__contents">
          <p class="Message__content">
            ${message.content}
          </p>
          <image class="Message__image" src="${message.image}">
        </div>
      </div>`
      return html
    } else {
      let html =
      `<div class="One-message" data-message-id=${message.id}>
        <div class="One-message__prof">
          <div class="One-message__prof--name">
            ${message.user_name}
          </div>
          <div class="One-message__prof--time">
            ${message.created_at}
          </div>
        </div>
        <div class="One-message__contents">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html
    }
  }
  $('.Form').on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".Main-chat__message-list").append(html);
      $('.Form__submit').prop('disabled', false);
      $('.Form')[0].reset();
      $('.Main-chat__message-list').animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });
});