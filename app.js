$(document).ready(function(){
	var vid = document.getElementById("myVideo");

	function playVid() {
	    vid.play();
	}
	playVid();
});

var app = angular.module('quizApp',[]);



app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.nquestoes =0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.bgimage = '';
				scope.scoreanterior = localStorage.getItem("scoreanterior");
				if(isNaN(scope.scoreanterior) )
				    scope.scoreanterior = 0

				scope.randomiza();
				scope.getQuestion();
				$('#titulozera').css("display", "none");
				$('body').css("background", "#391A66");
				$("body").addClass("Ingame");
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.scoreanterior = localStorage.setItem("scoreanterior", 	scope.score);
				scope.score = 0;
				$('#titulozera').css("display", "inherit");
				$('.container').removeClass("finish");
					$("body").removeClass("Ingame");

					$("#myVideo source").attr("src","temaprincipal.wav");
					var audio = $("#myVideo");
					audio[0].pause();
					audio[0].load();//suspends and restores all audio element

					//audio[0].play(); changed based on Sprachprofi's comment below
					audio[0].oncanplaythrough = audio[0].play();
			}
			scope.randomiza = function(){
			  quizFactory.shuffle();
			}
			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q && scope.nquestoes <=9) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.nquestoes +=1;
				} else {
					scope.quizOver = true;

					if(scope.score < 10)
						{
							$("#myVideo source").attr("src","perdedor.wav");
							var audio = $("#myVideo");
							audio[0].pause();
							audio[0].load();//suspends and restores all audio element

							//audio[0].play(); changed based on Sprachprofi's comment below
							audio[0].oncanplaythrough = audio[0].play();
						}
					if(scope.score == 10)
						{
							$("#myVideo source").attr("src","ganhador.wav");
							var audio = $("#myVideo");
							audio[0].pause();
							audio[0].load();//suspends and restores all audio element

							//audio[0].play(); changed based on Sprachprofi's comment below
							audio[0].oncanplaythrough = audio[0].play();
						}

					$('.container').delay(400).addClass("finish");
				}
			};

			scope.nextQuestion = function() {
				scope.id++;
				$('body').css("background", "#391A66");

				scope.getQuestion();
			}

			scope.checkAnswer = function() {
				if(scope.answerMode){
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					$('input[name=answer]:checked ~ label').addClass("correto animated infinite  pulse");
				// cor certa		$('body').css('background','#B8E484');
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
					$('input[name=answer]:checked ~ label').addClass("errado animated  rubberBand");
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
			question: "Qual animal mais peculiar criado na Casa do Estudante?",
			options: ["Vaca", "Cavalo", "Bode", "Ovelha"],
			answer: 1
		},
		{
			question: "Na planta original da UFSM, o que havia embaixo da ponte seca?",
			options: ["Um lago", "Um bosque", "Uma ciclovia", "Um portal místico"],
			answer: 0
		},
		{
			question: "Qual a principal atividade recreativa do bosque da UFSM?",
			options: ["Aplaudir o sol", "Caminhada", "Caçar esquilos", "Encontrar o/a crush"],
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
		},
		{
			question: "Qual o ritmo musical mais tocado nas festas do Centro de Eventos?",
			options: ["Axé music", "Ragatanga", "Sertanejo", "Funk ostentação"],
			answer: 2
		},
		{
			question: "Qual dessas festas nunca aconteceu na UFSM?",
			options: ["Batataço", "Bodocaço da Paixão", "Galope", "Salamaço"],
			answer: 3
		},
		{
			question: "Qual é a lesão mais recorrente durante a prova de vestibular/ENEM?",
			options: ["Torcicolo Invertido", "Lesão por chute repetitivo (LCR)", "Lombalgia localizada", "Canseira generalizada"],
			answer: 3
		},
		{
			question: "Qual é a comida mais esperada no cardápio do RU da semana?",
			options: ["Batata Palha com Fricassê", "Camarão na moranga", "Sushi e Yakisoba", "Bife à Havaiana"],
			answer: 0
		},
		{
			question: "Qual dessas comidas não é típica do RU?",
			options: ["Sovaco de Cobra", "Carne monstro", "Galinha explodida", "Bife à Havaiana"],
			answer: 0
		},
		{
			question: "Qual desses foi mascote nas Olimpiadas 2016 do Rio?",
			options: ["Fuleco", "Pileco", "Vinícius", "Peppa"],
			answer: 2
		},
		{
			question: "Que atividade é comum no planetário?",
			options: ["Contatos de terceiro grau", "Escalada externa", "Sessões sobre astronomia", "Experimentos científicos"],
			answer: 2
		},
		{
			question: "Você sabe o que significa UAB?",
			options: ["União de Acrobatas Brasileiros", "Universidade de Artistas Bacanas", "Universidade Aberta do Brasil", "Unidos da Avenida Brasil"],
			answer: 2
		},
		{
			question: "Como é carinhosamente apelidado o prédio 74 (CCSH)?",
			options: ["Titanic", "Castelo de Marx", "Templo da Miçanga", "Refúgio do Engels"],
			answer: 0
		},
		{
			question: "Qual desses não é um pokéStop da UFSM?",
			options: ["Estátua do Galo", "Colégio Técnico Industrial", "Planetário", "Casa do Estudante"],
			answer: 2
		},
		{
			question: "Qual desses personagens de Game of Thrones é como você (Não sabe nada)?",
			options: ["Hodor", "Melissandre", "Jorah Mormont", "John Snow"],
			answer: 3
		},
		{
			question: "Qual desses cursos EAD não é ofertado pela UFSM/UAB?",
			options: ["Letras", "Pedagogia", "Educação Especial", "Artes Visuais"],
			answer: 3
		},
		{
			question: "Onde é possível se informar sobre os cursos EAD da UFSM?",
			options: ["Coperves", "Reitoria", "NTE", "Biblioteca"],
			answer: 2
		},
		{
			question: "Qual é o nome do teatro do curso de Artes Cênicas da UFSM?",
			options: ["Treze de Maio", "Caixa Preta", "Ciranda de Pedra", "Suzana Vieira"],
			answer: 1
		},
		{
			question: "O que significa a sigla JAI?",
			options: ["Jornada Acadêmica de Idealizadores", "Jornada de Artistas Independentes", "Jornada Acadêmica Integrada", "Jornada Acadêmica de Inventores"],
			answer: 2
		},
		{
			question: "Qual o nome da linha de ônibus que chega e que parte da UFSM lotado?",
			options: ["Bombeiros", "Encanadores", "Tambo", "Circular"],
			answer: 0
		},
		{
			question: "Em que ano a UFSM foi inaugurada?",
			options: ["1945", "1952", "1978", "1960"],
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
		},
		shuffle: function() {
	        var counter = questions.length, temp, index;
	        while (counter--) {
	            index = (Math.random() * counter) | 0;
	            temp = questions[counter];
	            questions[counter] = questions[index];
	            questions[index] = temp;
	        }
	        return questions;
	    }
	}



});
