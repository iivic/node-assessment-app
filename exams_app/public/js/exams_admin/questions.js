$(function questionsScript () {
  // $.ajax({
  //     url: '/templates/new_question.html',
  //     method: 'GET',
  //     dataType: 'html', //** Must add
  //     async: false,
  //     success: function(data) {
  //       const compiled = _.template(data)
  //       $('#questions').append(compiled({name: 'Ivan'}))
  //     }
  // });

  const textInputTemplate = '<div><label for="answer">Answer:</label>' +
    '<input type="text" name"answer" required></div>'
  const yesNoTemplate = '<div><label for="answer">Answer:</label>' +
    '<input type="radio" name="answer" value="1">Yes' +
    '<input type="radio" name="answer" value="0" checked>No</div>'
  const $questionAnswer = $('#questionAnswer')
  const $questionAnswerEdit = $('#questionAnswerEdit')

  $('#questionForm').on('click', 'input[value="text_input"]', function () {
    $questionAnswer.html(_.template(textInputTemplate)())
  })
  $('#questionForm').on('click', 'input[value="true_false"]', function () {
    $questionAnswer.html(_.template(yesNoTemplate)())
  })

  $('#questionEditForm').on('click', 'input[value="text_input"]', function () {
    $questionAnswerEdit.html(_.template(textInputTemplate)())
  })
  $('#questionEditForm').on('click', 'input[value="true_false"]', function () {
    $questionAnswerEdit.html(_.template(yesNoTemplate)())
  })
})
