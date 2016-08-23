var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.bgimage = '';
				scope.getQuestion();
				$('body').css("background", "#fff");
				$("body").addClass("Ingame");
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
				$('.container').removeClass("finish");
					$("body").removeClass("Ingame");
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;

					if(scope.score < 4)
						{scope.bgimage = 'http://emojipedia-us.s3.amazonaws.com/cache/ef/e1/efe189b134eca42690fbd35f1b9c9fa2.png';}
					if(scope.score > 3 && scope.score < 7)
						{scope.bgimage = 'http://emojipedia-us.s3.amazonaws.com/cache/2f/71/2f71d332453020f3c909366c2d5514d0.png';}
					if(scope.score > 6 && scope.score < 10)
						{scope.bgimage = 'http://emojipedia-us.s3.amazonaws.com/cache/86/9c/869ce067db1339f2edac3ae3e0a54880.png';}
					if(scope.score == 10)
						{scope.bgimage = 'http://emojipedia-us.s3.amazonaws.com/cache/ba/7e/ba7eeae6a3ce9f316c19ef6ad49e5f4c.png';}


					$('.container').delay(400).addClass("finish");
				}
			};

			scope.nextQuestion = function() {
				scope.id++;
				$('body').css("background", "#fff");

				scope.getQuestion();
			}

			scope.checkAnswer = function() {
				if(scope.answerMode){
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					$('input[name=answer]:checked ~ label').addClass("correto");
				// cor certa		$('body').css('background','#B8E484');
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
					$('input[name=answer]:checked ~ label').addClass("errado");
				// cor errada	$('body').css('background','#FF867D');

					$("ul#options li input").each(function (index){
							var ans = $(this).val();
							if(ans == scope.options[scope.answer]) {
								$('~ label', this).addClass("correto");
							}
					});
				}

				scope.answerMode = false;
			}
			 setTimeout(function(){ $(".next-question").click();}, 3000);

			};


			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Qual desses cursos não é ofertado na UFSM?",
			options: ["Biologia", "Filosofia", "Engenharia Nuclear", "Letras Inglês"],
			answer: 2
		},
		{
			question: "Quantos catioros existem na ufsm?",
			options: ["3", "15", "55", "87"],
			answer: 1
		},
		{
			question: "Na planta original da UFSM, o que havia embaixo da ponte seca?",
			options: ["Um lago", "Um bosque", "Uma ciclovia", "Um portal místico"],
			answer: 0
		},
		{
			question: "Qual a principal atividade recreativa do bosque da UFSM?",
			options: ["Aplaudir o sol", "Caminhada", "Carne de Monstro", "Encontrar o/a crush"],
			answer: 1
		},
		{
			question: "Qual o som mais escutado no campus da UFSM?",
			options: ["Aviões da base aérea", "Divulgação das festas das Rurais", "Assembleias do Sindicato", "Latidos de catioros"],
			answer: 0
		},
		{
			question: "País onde está localizada a famosa Torre inclinada de Pisa?",
			options: ["Inglaterra", "Bélgica", "Itália", "França"],
			answer: 2
		},
		{
			question: "A Chapada Diamantina é uma região de serras, situada no centro de qual Estado brasileiro?",
			options: ["São Paulo", "Mato Grosso", "Bahia", "Pará"],
			answer: 2
		},
		{
			question: "O agente que causa a gripe é:",
			options: ["Uma bactéria", "Um helminto", "Um vírus", "Um espirro"],
			answer: 2
		},
		{
			question: "Tiradentes, o mártir da Inconfidência Mineira, era o apelido de quem?",
			options: ["João Cabral de Melo Neto", "Deodoro da Fonseca", "Cláudio da Costa", "Joaquim José da Silva Xavier"],
			answer: 3
		},
		{
			question: "Qual dessas não é uma linguagem de programação?",
			options: ["Java", "Lua", "HTML", "Python"],
			answer: 2
		},
		{
			question: "Cientista que estuda os insetos:",
			options: ["Etimologista", "Insetívoro", "Abelhudo", "Entomologista"],
			answer: 3
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});
