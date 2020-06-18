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

  let reloadMessages = function() {
    let last_message_id = $('.One-message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main-chat__message-list').append(insertHTML);
        $('.Main-chat__message-list').animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});