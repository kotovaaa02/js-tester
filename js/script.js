$(document).ready(function(){

    const startModal = new bootstrap.Modal('#staticBackdrop', {
        keyboard: false
    });

    startModal.show();

    let answer = [
        4,
        2,
        1,
        1,
        4,
        3,
        3,
        2,
        3,
        4,
        [2,3,5]
    ];
    let uanswer = [];
    $('.answer__variant').on('click', function() {
        let question = $(this).parents('.carousel-item').data('question');
        let multi = $(this).parents('.carousel-item').data('multi');
        if (multi) {
            $(this).toggleClass('active');
            let answer = [];
            $(this).parents('.carousel-item').find('.answer__variant.active').each(function() {
                answer.push($(this).data('answer'));
            });
            uanswer[question - 1] = answer;
        } else {
            $(this).parents('.carousel-item').find('.answer__variant').removeClass('active');
            $(this).addClass('active');
            let answer = $(this).data('answer');
            uanswer[question - 1] = answer;
        }
        console.log(uanswer);
    });

    $('.again').on('click', function() {
        window.location.reload();
    });
    const myCarousel = document.getElementById('carousel');

    myCarousel.addEventListener('slid.bs.carousel', event => {
        let idx = $('.carousel-item.active').data('question');
        if (idx == 1) {
            $('.btn-prev').addClass('hidden');
        } else {
            $('.btn-prev').removeClass('hidden');
        }
        if (idx == answer.length) {
            $('.btn-next').addClass('hidden');
            $('.btn-result').removeClass('hidden');
        } else {
            $('.btn-next').removeClass('hidden');
            $('.btn-result').addClass('hidden');
        }

    });

    const myModalEl = document.getElementById('exampleModal')
    myModalEl.addEventListener('shown.bs.modal', event => {
        let questions = answer.length;
        results = '';
        tanswers = 0;
        answer.forEach((el, index) => {
            console.log(el, index, uanswer[index]);
            if (el instanceof Array) {
                let el_str = el.join('');
                let uanswer_str = uanswer[index].join('');
                results = results + '<div>Вопрос ' + (index + 1) + ' - ' + (!uanswer[index] ? 'нет ответа' : el_str == uanswer_str ? 'верно' : 'не верно') + '</div>';
                if (el_str == uanswer_str) {
                    tanswers++;
                }
            } else {
                results = results + '<div>Вопрос ' + (index + 1) + ' - ' + (!uanswer[index] ? 'нет ответа' : el == uanswer[index] ? 'верно' : 'не верно') + '</div>';
                if (el == uanswer[index]) {
                    tanswers++;
                }
            }
        });
        $('.result-questions').html(results);
        $('.result-numbers span').html(tanswers + '/' + questions);
    })
});