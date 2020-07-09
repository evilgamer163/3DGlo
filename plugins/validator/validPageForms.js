const validHeader = new Validator({
    selector: '#form1',
    pattern: {
        'form1-name': /^[а-яА-Я]]$/,
        'form1-email': /^\w+@\w+\.\w{2,}$/,
        'form1-phone': /^\+?[78]([-()]*\d){10}$/
    },
    method: {
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'form1-name']
        ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'form1-email']
        ],
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'form1-phone']
        ]
    }
});

validHeader.init();

const validQuestionForm = new Validator({
    selector: '#form2',
    pattern: {
        'form2-name': /^[а-яА-Я]{3,30}$/,
        'form2-email': /^\w+@\w+\.\w{2,}$/,
        'form2-phone': /^\+?[78]([-()]*\d){10}$/,
        'form2-message': /^[а-яА-Я]{15,100}$/
    },
    method: {
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'form2-name']
        ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'form2-email']
        ],
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'form2-phone']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'form2-message']
        ]
    }
});

validQuestionForm.init();