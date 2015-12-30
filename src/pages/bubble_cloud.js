/**
 * By Nuno Baldaia (@nunobaldaia) for REACTION project
 *
 * Based on the work by Mike Bostock (@mbostock) for the
 * New York Times interactive visualization: "At the Republican Convention, the Words Being Used"
 * http://www.nytimes.com/interactive/2012/08/28/us/politics/convention-word-counts.html
 */


/**
 * Data
 */
var data = {};

(function() {

// All the topics
data.topics = [
  {
    "name": "gamar",
    "count": 27,
    "forms": "game",
    "sentiment": "negative",
    "id": 0,
    "comment_ids": [

    ]
  },
  {
    "name": "usar",
    "count": 24,
    "forms": "Use",
    "sentiment": "negative",
    "id": 1,
    "comment_ids": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ]
  },
  {
    "name": "direto",
    "count": 17,
    "forms": "direto",
    "sentiment": "positive",
    "id": 2,
    "comment_ids": [
      12,
      13,
      14
    ]
  },
  {
    "name": "directo",
    "count": 10,
    "forms": "directo",
    "sentiment": "positive",
    "id": 3,
    "comment_ids": [
      15,
      16
    ]
  },
  {
    "name": "interessante",
    "count": 8,
    "forms": "interessante",
    "sentiment": "positive",
    "id": 4,
    "comment_ids": [
      17,
      18,
      19,
      20,
      21,
      22
    ]
  },
  {
    "name": "lindo",
    "count": 7,
    "forms": "lindo",
    "sentiment": "positive",
    "id": 5,
    "comment_ids": [
      19,
      23,
      24,
      25,
      26,
      27
    ]
  },
  {
    "name": "mudo",
    "count": 7,
    "forms": "muda",
    "sentiment": "negative",
    "id": 6,
    "comment_ids": [
      28
    ]
  },
  {
    "name": "aberto",
    "count": 6,
    "forms": "Aberto",
    "sentiment": "positive",
    "id": 7,
    "comment_ids": [
      29,
      30,
      31,
      32,
      33
    ]
  },
  {
    "name": "medo",
    "count": 6,
    "forms": "medo",
    "sentiment": "negative",
    "id": 8,
    "comment_ids": [
      34
    ]
  },
  {
    "name": "perder",
    "count": 6,
    "forms": "perder",
    "sentiment": "negative",
    "id": 9,
    "comment_ids": [
      35,
      36
    ]
  },
  {
    "name": "macareno",
    "count": 5,
    "forms": "Macarena",
    "sentiment": "negative",
    "id": 10,
    "comment_ids": [
      26,
      37,
      38,
      39
    ]
  },
  {
    "name": "certo",
    "count": 4,
    "forms": "certo",
    "sentiment": "positive",
    "id": 11,
    "comment_ids": [
      27,
      40
    ]
  },
  {
    "name": "acreditar",
    "count": 4,
    "forms": "Acredito",
    "sentiment": "positive",
    "id": 12,
    "comment_ids": [
      21,
      41
    ]
  },
  {
    "name": "promissor",
    "count": 3,
    "forms": "promissores",
    "sentiment": "positive",
    "id": 13,
    "comment_ids": [
      42
    ]
  },
  {
    "name": "fora",
    "count": 3,
    "forms": "fora",
    "sentiment": "negative",
    "id": 14,
    "comment_ids": [
      43,
      44,
      45
    ]
  },
  {
    "name": "problema",
    "count": 3,
    "forms": "problemas",
    "sentiment": "negative",
    "id": 15,
    "comment_ids": [
      46,
      47
    ]
  },
  {
    "name": "vender-se",
    "count": 3,
    "forms": "venda",
    "sentiment": "negative",
    "id": 16,
    "comment_ids": [
      48,
      49
    ]
  },
  {
    "name": "gostar",
    "count": 3,
    "forms": "gosto",
    "sentiment": "positive",
    "id": 17,
    "comment_ids": [
      50
    ]
  },
  {
    "name": "atento",
    "count": 3,
    "forms": "atentos",
    "sentiment": "positive",
    "id": 18,
    "comment_ids": [
      51
    ]
  },
  {
    "name": "criatividade",
    "count": 2,
    "forms": "criatividade",
    "sentiment": "positive",
    "id": 19,
    "comment_ids": [
      52
    ]
  },
  {
    "name": "salvar",
    "count": 2,
    "forms": "salvou",
    "sentiment": "positive",
    "id": 20,
    "comment_ids": [
      53
    ]
  },
  {
    "name": "feliz",
    "count": 2,
    "forms": "feliz",
    "sentiment": "positive",
    "id": 21,
    "comment_ids": [
      54
    ]
  },
  {
    "name": "perfeito",
    "count": 2,
    "forms": "Perfeito",
    "sentiment": "positive",
    "id": 22,
    "comment_ids": [
      55,
      56
    ]
  },
  {
    "name": "agradecer",
    "count": 2,
    "forms": "agradece",
    "sentiment": "positive",
    "id": 23,
    "comment_ids": [

    ]
  },
  {
    "name": "caridoso",
    "count": 2,
    "forms": "caridosa",
    "sentiment": "positive",
    "id": 24,
    "comment_ids": [
      57
    ]
  },
  {
    "name": "safar-se",
    "count": 2,
    "forms": "safe",
    "sentiment": "positive",
    "id": 25,
    "comment_ids": [
      58
    ]
  },
  {
    "name": "pior",
    "count": 2,
    "forms": "pior",
    "sentiment": "negative",
    "id": 26,
    "comment_ids": [

    ]
  },
  {
    "name": "mal",
    "count": 2,
    "forms": "mal",
    "sentiment": "negative",
    "id": 27,
    "comment_ids": [
      59
    ]
  },
  {
    "name": "falta",
    "count": 2,
    "forms": "falta",
    "sentiment": "negative",
    "id": 28,
    "comment_ids": [

    ]
  },
  {
    "name": "chorar",
    "count": 2,
    "forms": "chorei",
    "sentiment": "negative",
    "id": 29,
    "comment_ids": [

    ]
  },
  {
    "name": "brutal",
    "count": 2,
    "forms": "brutal",
    "sentiment": "negative",
    "id": 30,
    "comment_ids": [
      60,
      61
    ]
  },
  {
    "name": "brincar",
    "count": 2,
    "forms": "brincar",
    "sentiment": "negative",
    "id": 31,
    "comment_ids": [
      62,
      63
    ]
  },
  {
    "name": "aproveitar-se",
    "count": 2,
    "forms": "aproveitar",
    "sentiment": "negative",
    "id": 32,
    "comment_ids": [
      64
    ]
  },
  {
    "name": "erro",
    "count": 2,
    "forms": "Erro",
    "sentiment": "negative",
    "id": 33,
    "comment_ids": [
      65,
      66
    ]
  },
  {
    "name": "apanhado",
    "count": 2,
    "forms": "Apanhado",
    "sentiment": "negative",
    "id": 34,
    "comment_ids": [
      67
    ]
  }
];

// Topic index for a faster access
data.topicIndex = {};
data.topics.forEach(function(topic) { data.topicIndex[topic.id] = topic; });

// Only topics shown as bubbles
data.bubble_topics = data.topics.slice(0, 50);

// The ids of comments containing the topics shown as bubbles
data.bubble_topic_comment_ids = [];
data.bubble_topics.forEach(function(topic) {
  topic.comment_ids.forEach(function(id) {
    if (data.bubble_topic_comment_ids.indexOf(id) == -1) {
      data.bubble_topic_comment_ids.push(id);
    }
  });
});

// All the comments
data.comments = [
  {
    "text": "@briansuda what app do you <a>use</a> for time tracking ? #codebits",
    "id": 0,
    "created_at": "2012-11-15T17:38:33Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "@jonasnuts CloudPT Api will come on time to <a>use</a> @codebits?",
    "id": 1,
    "created_at": "2012-11-15T17:49:04Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "\"my mom can <a>use</a> it\" is now a standard way of presenting new technologies... #codebits",
    "id": 2,
    "created_at": "2012-11-15T12:07:59Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Find teammates for the contest! <a>Use</a> HackerSearch from NOVA University! http://t.co/mFpg0PgL #codebits @codebits",
    "id": 3,
    "created_at": "2012-11-15T13:31:43Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Find teammates for the contest! <a>Use</a> HackerSearch from NOVA University! http://t.co/eNI1Gmdb  #codebits @codebits",
    "id": 4,
    "created_at": "2012-11-15T14:36:06Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Find teammates for the contest! <a>Use</a> HackerSearch from NOVA University! http://t.co/9KGyelJu  #codebits @codebits",
    "id": 5,
    "created_at": "2012-11-15T14:36:18Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "\"aesthetics matters\", so <a>use</a> python! - #codebits 2012,\"the art of readable code\" talk",
    "id": 6,
    "created_at": "2012-11-15T15:13:25Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "logging off due to #codebits spam *sigh* (and yes I know how to, but wont <a>use</a> apps with filters)",
    "id": 7,
    "created_at": "2012-11-15T11:26:25Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Do you have to have a sapo account to <a>use</a> cloud.pt ? #codebits  Or we have to register?",
    "id": 8,
    "created_at": "2012-11-15T15:35:25Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "\"YAY! 50.0 Gb are now yours to play with\" for life at #codebits to <a>use</a> on cloudPT cloud storage",
    "id": 9,
    "created_at": "2012-11-15T19:50:03Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "#codebits are you using Windows 8 in your projects? If yes you are free to <a>use</a> official Codebits app as an inspiration http://t.co/ggBdxV8Y",
    "id": 10,
    "created_at": "2012-11-15T13:28:56Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Thank you thank you @codebits for the awesome t-shirt which I can <a>use</a> on a daily basis for the first time yeah! :D",
    "id": 11,
    "created_at": "2012-11-15T17:58:04Z",
    "topic_ids": [
      1
    ]
  },
  {
    "text": "Siga em <a>direto</a> o #Codebits VI em http://t.co/YYQ92JQJ ou através do #Meo #Kanal, carregando no Botão verde + 263328",
    "id": 12,
    "created_at": "2012-11-15T10:49:21Z",
    "topic_ids": [
      2
    ]
  },
  {
    "text": "Siga em <a>direto</a> o #Codebits VI em http://t.co/FJ7oHNv6 ou através do #Meo #Kanal, carregando no Botão verde + 263328",
    "id": 13,
    "created_at": "2012-11-15T10:49:21Z",
    "topic_ids": [
      2
    ]
  },
  {
    "text": "@PortugalTelecom: Siga em <a>direto</a> o #Codebits VI em http://t.co/4GA0GHK5 ou através do #Meo #Kanal, carregando no... http://t.co/FWTYtMsK",
    "id": 14,
    "created_at": "2012-11-15T10:54:55Z",
    "topic_ids": [
      2
    ]
  },
  {
    "text": "Sigam o #Codebits em <a>directo</a> no meo kanal 263328",
    "id": 15,
    "created_at": "2012-11-15T11:16:25Z",
    "topic_ids": [
      3
    ]
  },
  {
    "text": "Para quem não tem meokanal siga aqui http://t.co/Atd3g6JQ @BaiaVieira: Sigam o #Codebits em <a>directo</a> no meo kanal 263328",
    "id": 16,
    "created_at": "2012-11-15T11:20:56Z",
    "topic_ids": [
      3
    ]
  },
  {
    "text": "Muito <a>interessante</a> esta apresentação do @undertheground no #codebits",
    "id": 17,
    "created_at": "2012-11-15T18:44:36Z",
    "topic_ids": [
      4
    ]
  },
  {
    "text": "desenvolvido inteiramente pela Sapo, muito <a>interessante</a> esta framework! #codebits http://t.co/b5joKHI7",
    "id": 18,
    "created_at": "2012-11-15T13:15:05Z",
    "topic_ids": [
      4
    ]
  },
  {
    "text": "Que <a>lindo</a> menino! “@ArturAnjos: Muito <a>interessante</a> esta apresentação do @undertheground no #codebits”",
    "id": 19,
    "created_at": "2012-11-15T18:49:21Z",
    "topic_ids": [
      5,
      4
    ]
  },
  {
    "text": "Estou a ver que o CodeBits está <a>interessante</a> este ano! :) #codebits2012 #CodeBits",
    "id": 20,
    "created_at": "2012-11-15T19:27:58Z",
    "topic_ids": [
      4
    ]
  },
  {
    "text": "<a>Acredito</a> que o Codebits seja um evento bem <a>interessante</a>, mas o nível de spam é too damn high!",
    "id": 21,
    "created_at": "2012-11-15T23:13:34Z",
    "topic_ids": [
      12,
      4
    ]
  },
  {
    "text": "“@ptnik: Meo Kanal vai ter app para iPad #codebits” isso torna o serviço 200% mais <a>interessante</a>. Até agora não conseguia usá-lo.",
    "id": 22,
    "created_at": "2012-11-15T11:17:41Z",
    "topic_ids": [
      4
    ]
  },
  {
    "text": "@vanessaquiterio @codebits é <a>lindo</a> é <a>lindo</a>!",
    "id": 23,
    "created_at": "2012-11-15T23:42:06Z",
    "topic_ids": [
      5,
      5
    ]
  },
  {
    "text": "Pessoal do @codebits #codebits cuidado todos teem ip público <a>lindo</a> :)",
    "id": 24,
    "created_at": "2012-11-15T15:51:15Z",
    "topic_ids": [
      5
    ]
  },
  {
    "text": "Social networking e um rebanho no ecrã. <a>lindo</a>! #codebits",
    "id": 25,
    "created_at": "2012-11-15T23:48:03Z",
    "topic_ids": [
      5
    ]
  },
  {
    "text": "<a>Macarena</a>! #codebits Basicamente, os apresentadores não conhecem os slides que estão a apresentar. isto é <a>lindo</a>, pró ano experimento.",
    "id": 26,
    "created_at": "2012-11-15T23:50:10Z",
    "topic_ids": [
      10,
      5
    ]
  },
  {
    "text": "#codebits sapo e lusa fazem digitalização de 2.5m (25 anos) de noticia. São feitos 8M(<a>certo</a>?) de links entre personalidades. :) <a>Lindo</a>?",
    "id": 27,
    "created_at": "2012-11-15T11:23:39Z",
    "topic_ids": [
      11,
      5
    ]
  },
  {
    "text": "Falecer <a>muda</a> a vida de uma pessoa #Win #codebits",
    "id": 28,
    "created_at": "2012-11-15T23:42:09Z",
    "topic_ids": [
      6
    ]
  },
  {
    "text": "<a>Aberto</a> até de Madrugada: Codebits Welcome Pack http://t.co/qvYny0WO",
    "id": 29,
    "created_at": "2012-11-15T18:17:53Z",
    "topic_ids": [
      7
    ]
  },
  {
    "text": "<a>Aberto</a> até de Madrugada: Codebits Welcome Pack http://t.co/UUnMNLk3",
    "id": 30,
    "created_at": "2012-11-15T18:27:38Z",
    "topic_ids": [
      7
    ]
  },
  {
    "text": "Sala Tejo <a>aberto</a>, hora de por as mãos na massa! #codebits http://t.co/Yt598pFT",
    "id": 31,
    "created_at": "2012-11-15T12:42:43Z",
    "topic_ids": [
      7
    ]
  },
  {
    "text": "\"Impossível é enfiares um guarda-chuva fechado pelo cu e tirá-lo <a>aberto</a>!\" #codebits #bisavoDoGajo",
    "id": 32,
    "created_at": "2012-11-15T17:41:02Z",
    "topic_ids": [
      7
    ]
  },
  {
    "text": "Tenho uma nova definição para o impossível… \"Impossível é meter um chapéu de chuva fechado no cú e tira-lo <a>aberto</a>!\" João Leitão @codebits",
    "id": 33,
    "created_at": "2012-11-15T17:46:17Z",
    "topic_ids": [
      7
    ]
  },
  {
    "text": "@codebits quem não tiver <a>medo</a> dos anos 90, pode ligar-se ao IRC. Host: http://t.co/tGisecLW:6667. canal #codebits ;-)",
    "id": 34,
    "created_at": "2012-11-15T14:13:47Z",
    "topic_ids": [
      8
    ]
  },
  {
    "text": "@vallovic Olha que belo dia de biblioteca estás a <a>perder</a>! #codebits #envy http://t.co/eT6482Ae",
    "id": 35,
    "created_at": "2012-11-15T11:47:23Z",
    "topic_ids": [
      9
    ]
  },
  {
    "text": "@Wonderm00n vou sim, depois digo-te. Mas só vou <a>perder</a> tempo com isto depois do codebits",
    "id": 36,
    "created_at": "2012-11-15T22:13:41Z",
    "topic_ids": [
      9
    ]
  },
  {
    "text": "<a>Macarena</a> #Win #codebits",
    "id": 37,
    "created_at": "2012-11-15T23:49:35Z",
    "topic_ids": [
      10
    ]
  },
  {
    "text": "Momento <a>Macarena</a> #codebits",
    "id": 38,
    "created_at": "2012-11-15T23:49:48Z",
    "topic_ids": [
      10
    ]
  },
  {
    "text": "<a>Macarena</a>! #Codebits http://t.co/i8ZS8rQL",
    "id": 39,
    "created_at": "2012-11-15T23:50:47Z",
    "topic_ids": [
      10
    ]
  },
  {
    "text": "Isto do CloudPT é o dropbox tuga basicamente <a>certo</a>? #codebits",
    "id": 40,
    "created_at": "2012-11-15T12:32:53Z",
    "topic_ids": [
      11
    ]
  },
  {
    "text": "@mluisbrown <a>acredito</a>... mas na wwdc não há open speakers e essas coisas.eu pensei que o #codebits era mais virado para os developers.",
    "id": 41,
    "created_at": "2012-11-15T11:27:32Z",
    "topic_ids": [
      12
    ]
  },
  {
    "text": "Sapo Codebits reúne jovens programadores <a>promissores</a> http://t.co/kaFa45Da",
    "id": 42,
    "created_at": "2012-11-15T23:04:57Z",
    "topic_ids": [
      13
    ]
  },
  {
    "text": "@codebits estamos a jantar <a>fora</a>, qual é a deadline? A",
    "id": 43,
    "created_at": "2012-11-15T21:22:43Z",
    "topic_ids": [
      14
    ]
  },
  {
    "text": "A seguir a \"tortura\" do Presentation Karaoke (por <a>fora</a>) #codebits http://t.co/LSFL5iJx",
    "id": 44,
    "created_at": "2012-11-15T23:29:49Z",
    "topic_ids": [
      14
    ]
  },
  {
    "text": "@undertheground agora estou a jantar <a>fora</a> do recinto, mas vou daqui a nada para o mesmo sítio! Quando chegar aviso. #codebits",
    "id": 45,
    "created_at": "2012-11-15T21:43:18Z",
    "topic_ids": [
      14
    ]
  },
  {
    "text": "@chateaufiesta: alguém com <a>problemas</a> a utilizar a app cloudPT em Android 4.0.4? #codebits",
    "id": 46,
    "created_at": "2012-11-15T12:56:15Z",
    "topic_ids": [
      15
    ]
  },
  {
    "text": "Baril baril era emitirem o filme no @MEOKanal mas suponho que isso traga <a>problemas</a> de direitos @celso @jonasnuts @codebits",
    "id": 47,
    "created_at": "2012-11-15T23:55:49Z",
    "topic_ids": [
      15
    ]
  },
  {
    "text": "alguem sabe dizer onde estão à <a>venda</a> os raspberry no #codebits ?",
    "id": 48,
    "created_at": "2012-11-15T16:59:17Z",
    "topic_ids": [
      16
    ]
  },
  {
    "text": "people que está no #codebits há peças \"separadas\" de Lego à <a>venda</a> como esta caixa??\nhttp://t.co/3TlBv8M6 e cxs. de portas e janelas,telhas?",
    "id": 49,
    "created_at": "2012-11-15T16:39:33Z",
    "topic_ids": [
      16
    ]
  },
  {
    "text": "Mundo numa rede, <a>gosto</a> :) #codebits",
    "id": 50,
    "created_at": "2012-11-15T11:25:17Z",
    "topic_ids": [
      17
    ]
  },
  {
    "text": "Se tiverem questões sobre o Ink, chutem debaixo das tags #ink &amp; #codebits. http://t.co/s21jISzM Estamos <a>atentos</a>. ;-)",
    "id": 51,
    "created_at": "2012-11-15T14:43:36Z",
    "topic_ids": [
      18
    ]
  },
  {
    "text": "@codebits o @Caneco merecia ganhar meia dúzia de puffs pela <a>criatividade</a>! http://t.co/Y5lu2xPy",
    "id": 52,
    "created_at": "2012-11-15T17:54:49Z",
    "topic_ids": [
      19
    ]
  },
  {
    "text": "Entro no mais stage e o mitch altman a dizer que a erva lhe <a>salvou</a> a vida… isso explica mto… #codebits",
    "id": 53,
    "created_at": "2012-11-15T14:13:48Z",
    "topic_ids": [
      20
    ]
  },
  {
    "text": "@codebits tou bué <a>feliz</a>!!",
    "id": 54,
    "created_at": "2012-11-15T21:34:34Z",
    "topic_ids": [
      21
    ]
  },
  {
    "text": "@gnclmorais @codebits <a>Perfeito</a>! Obrigado!",
    "id": 55,
    "created_at": "2012-11-15T17:35:46Z",
    "topic_ids": [
      22
    ]
  },
  {
    "text": "Tá <a>perfeito</a>.\n#codebits #meo #meokanal",
    "id": 56,
    "created_at": "2012-11-15T13:19:47Z",
    "topic_ids": [
      22
    ]
  },
  {
    "text": "#codebits Quem é a alma <a>caridosa</a> que me vai arranjar um ISO do Windows 7 32bits? GPS please!",
    "id": 57,
    "created_at": "2012-11-15T17:38:02Z",
    "topic_ids": [
      24
    ]
  },
  {
    "text": "@brohymn @Strone your virginity is <a>safe</a> @ #codebits",
    "id": 58,
    "created_at": "2012-11-15T10:47:53Z",
    "topic_ids": [
      25
    ]
  },
  {
    "text": "dançar um pco d gangnam style p ganhar 50gigas no cloudPT ñ me parece <a>mal</a> #codebits",
    "id": 59,
    "created_at": "2012-11-15T15:01:37Z",
    "topic_ids": [
      27
    ]
  },
  {
    "text": "Aos anos que não jogava isto...<a>brutal</a>! #codebits http://t.co/Za9enXTL",
    "id": 60,
    "created_at": "2012-11-15T19:44:01Z",
    "topic_ids": [
      30
    ]
  },
  {
    "text": "Sabem o que é isto? Uma impressora 3D ... <a>Brutal</a>! #codebits #3Dprinter #ultimaker",
    "id": 61,
    "created_at": "2012-11-15T19:54:24Z",
    "topic_ids": [
      30
    ]
  },
  {
    "text": "as crianças também cá estão... sim, a <a>brincar</a> com os Legos dos adultos! #codebits http://t.co/sYI8wydI",
    "id": 62,
    "created_at": "2012-11-15T11:32:54Z",
    "topic_ids": [
      31
    ]
  },
  {
    "text": "torna-se um pouco difícil <a>brincar</a> com a API do MEO Kanal não sendo subscritor do serviço.... @codebits",
    "id": 63,
    "created_at": "2012-11-15T19:47:31Z",
    "topic_ids": [
      31
    ]
  },
  {
    "text": "ò pra mim a <a>aproveitar</a> o #codebits para lançar uma nova versão do meu blog http://t.co/tfM6QvMd :D",
    "id": 64,
    "created_at": "2012-11-15T23:06:01Z",
    "topic_ids": [
      32
    ]
  },
  {
    "text": "Já alguém conseguiu instalar o cloudPT para iOS? <a>Erro</a>... #codebits",
    "id": 65,
    "created_at": "2012-11-15T12:49:48Z",
    "topic_ids": [
      33
    ]
  },
  {
    "text": "@jonasnuts não estou esquecido pois não? Ainda continua o <a>erro</a>. Podes tratar depois do codebits.",
    "id": 66,
    "created_at": "2012-11-15T20:29:20Z",
    "topic_ids": [
      33
    ]
  },
  {
    "text": "<a>Apanhado</a> na rede! #codebits  @ Codebits 2012 http://t.co/VEEvhfrH",
    "id": 67,
    "created_at": "2012-11-15T15:28:40Z",
    "topic_ids": [
      34
    ]
  }
];

// Comment index for a faster access
data.commentIndex = {};
data.comments.forEach(function(comment) { data.commentIndex[comment.id] = comment; });

// Trends
data.trends = [
    {
        "timestamp": "2014-01-01T00:00:00Z", 
        "value": 95
    }, 
    {
        "timestamp": "2014-01-02T00:00:00Z", 
        "value": 34
    }, 
    {
        "timestamp": "2014-01-03T00:00:00Z", 
        "value": 43
    }, 
    {
        "timestamp": "2014-01-04T00:00:00Z", 
        "value": 15
    }, 
    {
        "timestamp": "2014-01-05T00:00:00Z", 
        "value": 252
    }, 
    {
        "timestamp": "2014-01-06T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-01-07T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-01-08T00:00:00Z", 
        "value": 24
    }, 
    {
        "timestamp": "2014-01-09T00:00:00Z", 
        "value": 14
    }, 
    {
        "timestamp": "2014-01-10T00:00:00Z", 
        "value": 42
    }, 
    {
        "timestamp": "2014-01-11T00:00:00Z", 
        "value": 36
    }, 
    {
        "timestamp": "2014-01-12T00:00:00Z", 
        "value": 120
    }, 
    {
        "timestamp": "2014-01-13T00:00:00Z", 
        "value": 106
    }, 
    {
        "timestamp": "2014-01-14T00:00:00Z", 
        "value": 38
    }, 
    {
        "timestamp": "2014-01-15T00:00:00Z", 
        "value": 182
    }, 
    {
        "timestamp": "2014-01-16T00:00:00Z", 
        "value": 21
    }, 
    {
        "timestamp": "2014-01-17T00:00:00Z", 
        "value": 65
    }, 
    {
        "timestamp": "2014-01-18T00:00:00Z", 
        "value": 47
    }, 
    {
        "timestamp": "2014-01-19T00:00:00Z", 
        "value": 145
    }, 
    {
        "timestamp": "2014-01-20T00:00:00Z", 
        "value": 89
    }, 
    {
        "timestamp": "2014-01-21T00:00:00Z", 
        "value": 39
    }, 
    {
        "timestamp": "2014-01-22T00:00:00Z", 
        "value": 46
    }, 
    {
        "timestamp": "2014-01-23T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-01-24T00:00:00Z", 
        "value": 89
    }, 
    {
        "timestamp": "2014-01-25T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-01-26T00:00:00Z", 
        "value": 167
    }, 
    {
        "timestamp": "2014-01-27T00:00:00Z", 
        "value": 35
    }, 
    {
        "timestamp": "2014-01-28T00:00:00Z", 
        "value": 31
    }, 
    {
        "timestamp": "2014-01-29T00:00:00Z", 
        "value": 90
    }, 
    {
        "timestamp": "2014-01-30T00:00:00Z", 
        "value": 40
    }, 
    {
        "timestamp": "2014-01-31T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-02-01T00:00:00Z", 
        "value": 42
    }, 
    {
        "timestamp": "2014-02-02T00:00:00Z", 
        "value": 28
    }, 
    {
        "timestamp": "2014-02-03T00:00:00Z", 
        "value": 273
    }, 
    {
        "timestamp": "2014-02-04T00:00:00Z", 
        "value": 98
    }, 
    {
        "timestamp": "2014-02-05T00:00:00Z", 
        "value": 31
    }, 
    {
        "timestamp": "2014-02-06T00:00:00Z", 
        "value": 15
    }, 
    {
        "timestamp": "2014-02-07T00:00:00Z", 
        "value": 20
    }, 
    {
        "timestamp": "2014-02-08T00:00:00Z", 
        "value": 107
    }, 
    {
        "timestamp": "2014-02-09T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-02-10T00:00:00Z", 
        "value": 37
    }, 
    {
        "timestamp": "2014-02-11T00:00:00Z", 
        "value": 61
    }, 
    {
        "timestamp": "2014-02-12T00:00:00Z", 
        "value": 22
    }, 
    {
        "timestamp": "2014-02-13T00:00:00Z", 
        "value": 45
    }, 
    {
        "timestamp": "2014-02-14T00:00:00Z", 
        "value": 194
    }, 
    {
        "timestamp": "2014-02-15T00:00:00Z", 
        "value": 102
    }, 
    {
        "timestamp": "2014-02-16T00:00:00Z", 
        "value": 43
    }, 
    {
        "timestamp": "2014-02-17T00:00:00Z", 
        "value": 25
    }, 
    {
        "timestamp": "2014-02-18T00:00:00Z", 
        "value": 76
    }, 
    {
        "timestamp": "2014-02-19T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-02-20T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-02-21T00:00:00Z", 
        "value": 24
    }, 
    {
        "timestamp": "2014-02-22T00:00:00Z", 
        "value": 66
    }, 
    {
        "timestamp": "2014-02-23T00:00:00Z", 
        "value": 23
    }, 
    {
        "timestamp": "2014-02-24T00:00:00Z", 
        "value": 48
    }, 
    {
        "timestamp": "2014-02-25T00:00:00Z", 
        "value": 54
    }, 
    {
        "timestamp": "2014-02-26T00:00:00Z", 
        "value": 103
    }, 
    {
        "timestamp": "2014-02-27T00:00:00Z", 
        "value": 36
    }, 
    {
        "timestamp": "2014-02-28T00:00:00Z", 
        "value": 22
    }, 
    {
        "timestamp": "2014-03-01T00:00:00Z", 
        "value": 78
    }, 
    {
        "timestamp": "2014-03-02T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-03-03T00:00:00Z", 
        "value": 21
    }, 
    {
        "timestamp": "2014-03-04T00:00:00Z", 
        "value": 22
    }, 
    {
        "timestamp": "2014-03-05T00:00:00Z", 
        "value": 38
    }, 
    {
        "timestamp": "2014-03-06T00:00:00Z", 
        "value": 62
    }, 
    {
        "timestamp": "2014-03-07T00:00:00Z", 
        "value": 75
    }, 
    {
        "timestamp": "2014-03-08T00:00:00Z", 
        "value": 122
    }, 
    {
        "timestamp": "2014-03-09T00:00:00Z", 
        "value": 40
    }, 
    {
        "timestamp": "2014-03-10T00:00:00Z", 
        "value": 20
    }, 
    {
        "timestamp": "2014-03-11T00:00:00Z", 
        "value": 47
    }, 
    {
        "timestamp": "2014-03-12T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-03-13T00:00:00Z", 
        "value": 69
    }, 
    {
        "timestamp": "2014-03-14T00:00:00Z", 
        "value": 75
    }, 
    {
        "timestamp": "2014-03-15T00:00:00Z", 
        "value": 163
    }, 
    {
        "timestamp": "2014-03-16T00:00:00Z", 
        "value": 37
    }, 
    {
        "timestamp": "2014-03-17T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-03-18T00:00:00Z", 
        "value": 73
    }, 
    {
        "timestamp": "2014-03-19T00:00:00Z", 
        "value": 37
    }, 
    {
        "timestamp": "2014-03-20T00:00:00Z", 
        "value": 43
    }, 
    {
        "timestamp": "2014-03-21T00:00:00Z", 
        "value": 66
    }, 
    {
        "timestamp": "2014-03-22T00:00:00Z", 
        "value": 248
    }, 
    {
        "timestamp": "2014-03-23T00:00:00Z", 
        "value": 62
    }, 
    {
        "timestamp": "2014-03-24T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-03-25T00:00:00Z", 
        "value": 37
    }, 
    {
        "timestamp": "2014-03-26T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-03-27T00:00:00Z", 
        "value": 21
    }, 
    {
        "timestamp": "2014-03-28T00:00:00Z", 
        "value": 40
    }, 
    {
        "timestamp": "2014-03-29T00:00:00Z", 
        "value": 100
    }, 
    {
        "timestamp": "2014-03-30T00:00:00Z", 
        "value": 23
    }, 
    {
        "timestamp": "2014-03-31T00:00:00Z", 
        "value": 19
    }, 
    {
        "timestamp": "2014-04-01T00:00:00Z", 
        "value": 60
    }, 
    {
        "timestamp": "2014-04-02T00:00:00Z", 
        "value": 147
    }, 
    {
        "timestamp": "2014-04-03T00:00:00Z", 
        "value": 46
    }, 
    {
        "timestamp": "2014-04-04T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-04-05T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-04-06T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-04-07T00:00:00Z", 
        "value": 48
    }, 
    {
        "timestamp": "2014-04-08T00:00:00Z", 
        "value": 580
    }, 
    {
        "timestamp": "2014-04-09T00:00:00Z", 
        "value": 136
    }, 
    {
        "timestamp": "2014-04-10T00:00:00Z", 
        "value": 68
    }, 
    {
        "timestamp": "2014-04-11T00:00:00Z", 
        "value": 80
    }, 
    {
        "timestamp": "2014-04-12T00:00:00Z", 
        "value": 19
    }, 
    {
        "timestamp": "2014-04-13T00:00:00Z", 
        "value": 43
    }, 
    {
        "timestamp": "2014-04-14T00:00:00Z", 
        "value": 10
    }, 
    {
        "timestamp": "2014-04-15T00:00:00Z", 
        "value": 8
    }, 
    {
        "timestamp": "2014-04-16T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-04-17T00:00:00Z", 
        "value": 18
    }, 
    {
        "timestamp": "2014-04-18T00:00:00Z", 
        "value": 13
    }, 
    {
        "timestamp": "2014-04-19T00:00:00Z", 
        "value": 163
    }, 
    {
        "timestamp": "2014-04-20T00:00:00Z", 
        "value": 36
    }, 
    {
        "timestamp": "2014-04-21T00:00:00Z", 
        "value": 99
    }, 
    {
        "timestamp": "2014-04-22T00:00:00Z", 
        "value": 347
    }, 
    {
        "timestamp": "2014-04-23T00:00:00Z", 
        "value": 124
    }, 
    {
        "timestamp": "2014-04-24T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-04-25T00:00:00Z", 
        "value": 70
    }, 
    {
        "timestamp": "2014-04-26T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-04-27T00:00:00Z", 
        "value": 553
    }, 
    {
        "timestamp": "2014-04-28T00:00:00Z", 
        "value": 69
    }, 
    {
        "timestamp": "2014-04-29T00:00:00Z", 
        "value": 258
    }, 
    {
        "timestamp": "2014-04-30T00:00:00Z", 
        "value": 686
    }, 
    {
        "timestamp": "2014-05-01T00:00:00Z", 
        "value": 125
    }, 
    {
        "timestamp": "2014-05-02T00:00:00Z", 
        "value": 78
    }, 
    {
        "timestamp": "2014-05-03T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-05-04T00:00:00Z", 
        "value": 87
    }, 
    {
        "timestamp": "2014-05-05T00:00:00Z", 
        "value": 87
    }, 
    {
        "timestamp": "2014-05-06T00:00:00Z", 
        "value": 41
    }, 
    {
        "timestamp": "2014-05-07T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-05-08T00:00:00Z", 
        "value": 23
    }, 
    {
        "timestamp": "2014-05-09T00:00:00Z", 
        "value": 22
    }, 
    {
        "timestamp": "2014-05-10T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-05-11T00:00:00Z", 
        "value": 111
    }, 
    {
        "timestamp": "2014-05-12T00:00:00Z", 
        "value": 18
    }, 
    {
        "timestamp": "2014-05-13T00:00:00Z", 
        "value": 20
    }, 
    {
        "timestamp": "2014-05-14T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-05-15T00:00:00Z", 
        "value": 21
    }, 
    {
        "timestamp": "2014-05-16T00:00:00Z", 
        "value": 56
    }, 
    {
        "timestamp": "2014-05-17T00:00:00Z", 
        "value": 98
    }, 
    {
        "timestamp": "2014-05-18T00:00:00Z", 
        "value": 82
    }, 
    {
        "timestamp": "2014-05-19T00:00:00Z", 
        "value": 51
    }, 
    {
        "timestamp": "2014-05-20T00:00:00Z", 
        "value": 36
    }, 
    {
        "timestamp": "2014-05-21T00:00:00Z", 
        "value": 54
    }, 
    {
        "timestamp": "2014-05-22T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-05-23T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-05-24T00:00:00Z", 
        "value": 333
    }, 
    {
        "timestamp": "2014-05-25T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-05-26T00:00:00Z", 
        "value": 51
    }, 
    {
        "timestamp": "2014-05-27T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-05-28T00:00:00Z", 
        "value": 11
    }, 
    {
        "timestamp": "2014-05-29T00:00:00Z", 
        "value": 21
    }, 
    {
        "timestamp": "2014-05-30T00:00:00Z", 
        "value": 18
    }, 
    {
        "timestamp": "2014-05-31T00:00:00Z", 
        "value": 7
    }, 
    {
        "timestamp": "2014-06-01T00:00:00Z", 
        "value": 6
    }, 
    {
        "timestamp": "2014-06-02T00:00:00Z", 
        "value": 117
    }, 
    {
        "timestamp": "2014-06-03T00:00:00Z", 
        "value": 137
    }, 
    {
        "timestamp": "2014-06-04T00:00:00Z", 
        "value": 114
    }, 
    {
        "timestamp": "2014-06-05T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-06-06T00:00:00Z", 
        "value": 33
    }, 
    {
        "timestamp": "2014-06-07T00:00:00Z", 
        "value": 14
    }, 
    {
        "timestamp": "2014-06-08T00:00:00Z", 
        "value": 102
    }, 
    {
        "timestamp": "2014-06-09T00:00:00Z", 
        "value": 65
    }, 
    {
        "timestamp": "2014-06-10T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-06-11T00:00:00Z", 
        "value": 14
    }, 
    {
        "timestamp": "2014-06-12T00:00:00Z", 
        "value": 50
    }, 
    {
        "timestamp": "2014-06-13T00:00:00Z", 
        "value": 273
    }, 
    {
        "timestamp": "2014-06-14T00:00:00Z", 
        "value": 63
    }, 
    {
        "timestamp": "2014-06-15T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-06-16T00:00:00Z", 
        "value": 77
    }, 
    {
        "timestamp": "2014-06-17T00:00:00Z", 
        "value": 92
    }, 
    {
        "timestamp": "2014-06-18T00:00:00Z", 
        "value": 109
    }, 
    {
        "timestamp": "2014-06-19T00:00:00Z", 
        "value": 66
    }, 
    {
        "timestamp": "2014-06-20T00:00:00Z", 
        "value": 67
    }, 
    {
        "timestamp": "2014-06-21T00:00:00Z", 
        "value": 36
    }, 
    {
        "timestamp": "2014-06-22T00:00:00Z", 
        "value": 98
    }, 
    {
        "timestamp": "2014-06-23T00:00:00Z", 
        "value": 78
    }, 
    {
        "timestamp": "2014-06-24T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-06-25T00:00:00Z", 
        "value": 15
    }, 
    {
        "timestamp": "2014-06-26T00:00:00Z", 
        "value": 120
    }, 
    {
        "timestamp": "2014-06-27T00:00:00Z", 
        "value": 7
    }, 
    {
        "timestamp": "2014-06-28T00:00:00Z", 
        "value": 15
    }, 
    {
        "timestamp": "2014-06-29T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-06-30T00:00:00Z", 
        "value": 101
    }, 
    {
        "timestamp": "2014-07-01T00:00:00Z", 
        "value": 429
    }, 
    {
        "timestamp": "2014-07-02T00:00:00Z", 
        "value": 78
    }, 
    {
        "timestamp": "2014-07-03T00:00:00Z", 
        "value": 39
    }, 
    {
        "timestamp": "2014-07-04T00:00:00Z", 
        "value": 11
    }, 
    {
        "timestamp": "2014-07-05T00:00:00Z", 
        "value": 38
    }, 
    {
        "timestamp": "2014-07-06T00:00:00Z", 
        "value": 14
    }, 
    {
        "timestamp": "2014-07-07T00:00:00Z", 
        "value": 107
    }, 
    {
        "timestamp": "2014-07-08T00:00:00Z", 
        "value": 99
    }, 
    {
        "timestamp": "2014-07-09T00:00:00Z", 
        "value": 56
    }, 
    {
        "timestamp": "2014-07-10T00:00:00Z", 
        "value": 20
    }, 
    {
        "timestamp": "2014-07-11T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-07-12T00:00:00Z", 
        "value": 68
    }, 
    {
        "timestamp": "2014-07-13T00:00:00Z", 
        "value": 54
    }, 
    {
        "timestamp": "2014-07-14T00:00:00Z", 
        "value": 52
    }, 
    {
        "timestamp": "2014-07-15T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-07-16T00:00:00Z", 
        "value": 57
    }, 
    {
        "timestamp": "2014-07-17T00:00:00Z", 
        "value": 12
    }, 
    {
        "timestamp": "2014-07-18T00:00:00Z", 
        "value": 9
    }, 
    {
        "timestamp": "2014-07-19T00:00:00Z", 
        "value": 39
    }, 
    {
        "timestamp": "2014-07-20T00:00:00Z", 
        "value": 19
    }, 
    {
        "timestamp": "2014-07-21T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-07-22T00:00:00Z", 
        "value": 29
    }, 
    {
        "timestamp": "2014-07-23T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-07-24T00:00:00Z", 
        "value": 24
    }, 
    {
        "timestamp": "2014-07-25T00:00:00Z", 
        "value": 51
    }, 
    {
        "timestamp": "2014-07-26T00:00:00Z", 
        "value": 40
    }, 
    {
        "timestamp": "2014-07-27T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-07-28T00:00:00Z", 
        "value": 12
    }, 
    {
        "timestamp": "2014-07-29T00:00:00Z", 
        "value": 76
    }, 
    {
        "timestamp": "2014-07-30T00:00:00Z", 
        "value": 41
    }, 
    {
        "timestamp": "2014-07-31T00:00:00Z", 
        "value": 32
    }, 
    {
        "timestamp": "2014-08-01T00:00:00Z", 
        "value": 11
    }, 
    {
        "timestamp": "2014-08-02T00:00:00Z", 
        "value": 11
    }, 
    {
        "timestamp": "2014-08-03T00:00:00Z", 
        "value": 31
    }, 
    {
        "timestamp": "2014-08-04T00:00:00Z", 
        "value": 23
    }, 
    {
        "timestamp": "2014-08-05T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-08-06T00:00:00Z", 
        "value": 8
    }, 
    {
        "timestamp": "2014-08-07T00:00:00Z", 
        "value": 54
    }, 
    {
        "timestamp": "2014-08-08T00:00:00Z", 
        "value": 14
    }, 
    {
        "timestamp": "2014-08-09T00:00:00Z", 
        "value": 23
    }, 
    {
        "timestamp": "2014-08-10T00:00:00Z", 
        "value": 28
    }, 
    {
        "timestamp": "2014-08-11T00:00:00Z", 
        "value": 8
    }, 
    {
        "timestamp": "2014-08-14T00:00:00Z", 
        "value": 3
    }, 
    {
        "timestamp": "2014-08-15T00:00:00Z", 
        "value": 18
    }, 
    {
        "timestamp": "2014-08-16T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-08-17T00:00:00Z", 
        "value": 12
    }, 
    {
        "timestamp": "2014-08-18T00:00:00Z", 
        "value": 67
    }, 
    {
        "timestamp": "2014-08-19T00:00:00Z", 
        "value": 40
    }, 
    {
        "timestamp": "2014-08-20T00:00:00Z", 
        "value": 8
    }, 
    {
        "timestamp": "2014-08-21T00:00:00Z", 
        "value": 155
    }, 
    {
        "timestamp": "2014-08-22T00:00:00Z", 
        "value": 33
    }, 
    {
        "timestamp": "2014-08-23T00:00:00Z", 
        "value": 55
    }, 
    {
        "timestamp": "2014-08-24T00:00:00Z", 
        "value": 7
    }, 
    {
        "timestamp": "2014-08-25T00:00:00Z", 
        "value": 19
    }, 
    {
        "timestamp": "2014-08-26T00:00:00Z", 
        "value": 17
    }, 
    {
        "timestamp": "2014-08-27T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-08-28T00:00:00Z", 
        "value": 134
    }, 
    {
        "timestamp": "2014-08-29T00:00:00Z", 
        "value": 63
    }, 
    {
        "timestamp": "2014-08-30T00:00:00Z", 
        "value": 115
    }, 
    {
        "timestamp": "2014-08-31T00:00:00Z", 
        "value": 35
    }, 
    {
        "timestamp": "2014-09-01T00:00:00Z", 
        "value": 20
    }, 
    {
        "timestamp": "2014-09-02T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-09-03T00:00:00Z", 
        "value": 13
    }, 
    {
        "timestamp": "2014-09-04T00:00:00Z", 
        "value": 85
    }, 
    {
        "timestamp": "2014-09-05T00:00:00Z", 
        "value": 9
    }, 
    {
        "timestamp": "2014-09-06T00:00:00Z", 
        "value": 6
    }, 
    {
        "timestamp": "2014-09-07T00:00:00Z", 
        "value": 69
    }, 
    {
        "timestamp": "2014-09-08T00:00:00Z", 
        "value": 26
    }, 
    {
        "timestamp": "2014-09-09T00:00:00Z", 
        "value": 30
    }, 
    {
        "timestamp": "2014-09-10T00:00:00Z", 
        "value": 27
    }, 
    {
        "timestamp": "2014-09-11T00:00:00Z", 
        "value": 101
    }, 
    {
        "timestamp": "2014-09-12T00:00:00Z", 
        "value": 37
    }, 
    {
        "timestamp": "2014-09-13T00:00:00Z", 
        "value": 72
    }, 
    {
        "timestamp": "2014-09-14T00:00:00Z", 
        "value": 186
    }, 
    {
        "timestamp": "2014-09-15T00:00:00Z", 
        "value": 161
    }, 
    {
        "timestamp": "2014-09-16T00:00:00Z", 
        "value": 50
    }, 
    {
        "timestamp": "2014-09-17T00:00:00Z", 
        "value": 47
    }, 
    {
        "timestamp": "2014-09-18T00:00:00Z", 
        "value": 415
    }, 
    {
        "timestamp": "2014-09-19T00:00:00Z", 
        "value": 496
    }, 
    {
        "timestamp": "2014-09-20T00:00:00Z", 
        "value": 58
    }, 
    {
        "timestamp": "2014-09-21T00:00:00Z", 
        "value": 69
    }
];

})();

/**
 * Bubble Cloud visualization
 */
var width = 512,
    height = 512;

var padding = 4, // collision padding
    maxRadius = 62, // collision search radius
    maxComments = 12, // limit displayed mentions
    activeTopic; // currently-displayed topic

var r = d3.scale.sqrt()
    .domain([0, d3.max(data.bubble_topics, function(d) { return d.count; })])
    .range([0, maxRadius]);

var force = d3.layout.force()
    .gravity(0)
    .charge(0)
    .size([width, height])
    .on("tick", tick);

var node = d3.select(".g-nodes").selectAll(".g-node"),
    label = d3.select(".g-labels").selectAll(".g-label");

d3.select(".g-nodes").append("rect")
    .attr("class", "g-overlay")
    .attr("width", width)
    .attr("height", height)
    .on("click", clear);

d3.select(window)
    .on("hashchange", hashchange);

updateTopics(data.bubble_topics);
hashchange();

// Update the known topics.
function updateTopics(topics) {
  topics.forEach(function(d, i) { d.r = Math.max(12, r(d.count)); }); // min. collision
  force.nodes(data.bubble_topics = topics).start();
  updateNodes();
  updateLabels();
}

// Update the displayed nodes.
function updateNodes() {
  node = node.data(data.bubble_topics, function(d) { return d.name; });

  node.exit().remove();

  node.enter().append("a")
      .attr("class", function(d) { return "g-node "+d.sentiment; })
      .attr("xlink:href", function(d) { return "#" + encodeURIComponent(d.name); })
      .call(force.drag)
      .call(linkTopic)
    .append("circle");

  node.select("circle")
      .attr("r", function(d) { return r(d.count); });
}

// Update the displayed node labels.
function updateLabels() {
  label = label.data(data.bubble_topics, function(d) { return d.name; });

  label.exit().remove();

  var labelEnter = label.enter().append("a")
      .attr("class", "g-label")
      .attr("href", function(d) { return "#" + encodeURIComponent(d.name); })
      .call(force.drag)
      .call(linkTopic);

  labelEnter.append("div")
      .attr("class", "g-name")
      .text(function(d) { return d.name; });

  labelEnter.append("div")
      .attr("class", "g-value");

  label
      .style("font-size", function(d) { return Math.max(8, r(d.count) / 2) + "px"; })
      .style("width", function(d) { return r(d.count) * 2.5 + "px"; });

  // Create a temporary span to compute the true text width.
  label.append("span")
      .text(function(d) { return d.name; })
      .each(function(d) { d.dx = Math.max(2.5 * r(d.count), this.getBoundingClientRect().width); })
      .remove();

  label
      .style("width", function(d) { return d.dx + "px"; })
    .select(".g-value")
      .text(function(d) { return d.count + (d.r > 60 ? " menções" : ""); });

  // Compute the height of labels when wrapped.
  label.each(function(d) { d.dy = this.getBoundingClientRect().height; });
}

// Update the active topic.
function updateActiveTopic(topic) {
  if (activeTopic = topic) {
    node.classed("g-selected", function(d) { return d === topic; });
    updateMentions(topic);
    // d3.select("#g-topic").text((topic.commentsCount > maxComments ? "Uma amostra dos " : topic.commentsCount || "Não há") + " comentários que utilizam a palavra “" + topic.name + "”");
  } else {
    node.classed("g-selected", false);
    updateMentions()
    // d3.select("#g-topic").text("Uma amostra dos comentários");
  }
}

// Update displayed comments.
function updateMentions(topic) {
  // Display all the comments containing topics shown on bubbles
  // if no topic is given or the comments containing the given topic otherwise.
  var comments = (topic ? topic.comment_ids : data.bubble_topic_comment_ids).map(function(id) { return data.commentIndex[id]; });

  // If too many comments, a random sample is used
  if (comments.length > maxComments) {
    comments = shuffle(comments).slice(0, maxComments);
  }

  // Rather than compute a data-join, just blow away the entire layout.
  // With wider support for multi-column layout, a data-join would work.
  var column = d3.selectAll(".g-mentions")
      .datum(0)
      .html(null);

  var heights = column.data(),
      indexes = d3.range(heights.length);

  // Incrementally add each new speaker to the shortest column untill filling the available space
  var overflow = false;
  comments.forEach(function(comment) {
    if (overflow) return;

    var index = d3.first(indexes, function(a, b) { return heights[a] - heights[b]; });

    var div = d3.select(column[0][index]).append("div")
        .attr("class", "g-mention");

    // div.append("p")
    //     .attr("class", "date")
    //     .text("YYYY-MM-DD");

    var p = div.append("p")
        .attr("class", "mention")
        .html(comment.text);

    p.selectAll("a")
      .data(comment.topic_ids.map(function(id) { return data.topicIndex[id]; }))
        .attr("href", function(d) { return "#" + encodeURIComponent(d.name); })
        .attr("class", function(d) { return d == topic ? d.sentiment+" active" : d.sentiment; })
        .call(linkTopic);

    heights[index] += div.node().getBoundingClientRect().height;

    if (heights[index] > 370) {
      div.remove();
      overflow = true;
    }
  });
}

// Assign event handlers to topic links.
function linkTopic(a) {
  a   .on("click", click)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
}

// Returns the topic matching the specified name, approximately.
// If no matching topic is found, returns undefined.
function findTopic(name) {
  for (var i = 0, n = data.topics.length, t; i < n; ++i) {
    if ((t = data.topics[i]).name === name) {
      return t;
    }
  }
}

// Simulate forces and update node and label positions on tick.
function tick(e) {
  node
      .each(gravity(e.alpha * .1))
      .each(collide(.5))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  label
      .style("left", function(d) { return (d.x - d.dx / 2) + "px"; })
      .style("top", function(d) { return (d.y - d.dy / 2) + "px"; });
}

// Custom gravity to favor a non-square aspect ratio.
function gravity(alpha) {
  var cx = width / 2,
      cy = height / 2,
      ax = alpha / 4,
      ay = alpha / 4;
  return function(d) {
    d.x += (cx - d.x) * ax;
    d.y += (cy - d.y) * ay;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {
  var q = d3.geom.quadtree(data.bubble_topics);
  return function(d) {
    var r = d.r + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    q.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.r + quad.point.r + padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

// Fisher–Yates shuffle.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// Update the active topic on hashchange, perhaps creating a new topic.
function hashchange() {
  var name = decodeURIComponent(location.hash.substring(1)).trim();
  updateActiveTopic(name && name != "!" ? findTopic(name) : null);
}

// Clear the active topic when clicking on the chart background.
function clear() {
  location.replace("#!");
}

// Rather than flood the browser history, use location.replace.
function click(d) {
  location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
  d3.event.preventDefault();
}

// When hovering the label, highlight the associated node and vice versa.
// When no topic is active, also cross-highlight with any mentions in excerpts.
function mouseover(d) {
  node.classed("g-hover", function(p) { return p === d; });
  d3.selectAll(".g-mention a").classed("g-hover", function(a) { return a === d; });
}

// When hovering the label, highlight the associated node and vice versa.
// When no topic is active, also cross-highlight with any mentions in excerpts.
function mouseout(d) {
  node.classed("g-hover", false);
  d3.selectAll(".g-mention a").classed("g-hover", false);
}


/**
 * Trendline visualization
 */
(function() {

var settings = {
  animatinoDuration: 1000,
  eventTextHeight: 0,
  eventIconSize: 0,
  eventMargin: 2,
  markerColor: "#444",
  fillColor: "#FECEA8",
  strokeColor: "#E5BA94",
  strokeWidth: 2
};

function drawTrendline(svg, width, height, granularity, trends, options) {
  trends.forEach(function(trend) {
    if (typeof(trend.timestamp) == "string") {
      trend.timestamp = new Date(trend.timestamp);
    }
  });

  var xMin = d3.first(trends).timestamp;
  var xMax = d3.last(trends).timestamp;
  var yMin = 0;
  var yMax = d3.max(trends, function(d) { return d.value; });
  var xScale = d3.time.scale().domain([xMin, xMax]).range([0, width]);
  var yScale = d3.scale.linear().domain([yMin, yMax]).range([0, height-settings.eventTextHeight-settings.eventIconSize-2*settings.eventMargin]);
  var innerSvg = svg.append("svg:g").attr("class", "trendline").attr("transform", "translate(0,"+height+")");


  // Events
  innerSvg.selectAll(".event").remove();

  var prevEventX = 0;
  var prevEventY = 0;

  trends.forEach(function(trend) {
    var x = xScale(trend.timestamp);
    var y;

    if (trend.event) {
      y = x-prevEventX < settings.eventIconSize ? prevEventY-settings.eventIconSize : height;

      var eventSvg = innerSvg.append("svg:g")
      .attr("class", "event up "+trend.event.type)
      .attr("data-timestamp", trend.timestamp);

      eventSvg.append("svg:line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", -(y-settings.eventTextHeight-settings.eventIconSize-2*settings.eventMargin));

      eventSvg.append("svg:image")
      .attr("x", x-settings.eventIconSize/2)
      .attr("y", -(y-settings.eventTextHeight-settings.eventMargin))
      .attr("width", settings.eventIconSize+"px")
      .attr("height", settings.eventIconSize+"px")
      .attr("xlink:href", "img/trendline-event-icons/"+trend.event.type+".png")
      .on("mouseover", function() {
        highlightEvent(d3.event.target.parentNode);
      })
      .on("mouseout", function() {
        highlightEvent();
      })
      .on("click", function() {
        if (trend.event.type === "Match") {
          switch (currentPage.type) {
            case "home":
            window.location.hash = "home&match="+trend.event.id;
            break;
            case "team":
            case "player":
            window.location.hash = currentPage.type+"="+currentPage.id+"&match="+trend.event.id;
            break;
          }
        }
      });

      eventSvg.append("svg:text")
      .attr("x", x)
      .attr("y", -height)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "baseline")
      .text(trend.event.text);

      prevEventX = x;
      prevEventY = y;
    }

  });

  // Adjust text x position to be always visible
  innerSvg.selectAll("text")[0].forEach(function(text) {
    var bbox = text.getBBox();
    if (bbox.x < 0) {
      d3.select(text).attr("x", bbox.width/2);
    } else if (bbox.x + bbox.width > width) {
      d3.select(text).attr("x", width-bbox.width/2);
    }
  });

  //// Generators
  var areaGenerator = d3.svg.area()
  .x(function(d) { return xScale(d.timestamp); })
  .y1(function(d) { return -yScale(d.value); })
  .interpolate("linear");

  var lineGenerator = d3.svg.line()
  .x(function(d) { return xScale(d.timestamp); })
  .y(function(d) { return -yScale(d.value); })
  .interpolate("linear");

  var hitAreaGenerator = d3.svg.area()
  .x(function(d) { return xScale(d.timestamp); })
  .y1(function(d) { return -yScale(d.value)-20; })
  .interpolate("linear");

  //// Area/line
  var area = innerSvg.selectAll("path.area").data([trends]);
  updatePath(area, areaGenerator);

  var line = innerSvg.selectAll("path.line").data([trends]);
  updatePath(line, lineGenerator);

  var hitArea = innerSvg.selectAll("path.hit-area").data([trends]);
  updatePath(area, hitAreaGenerator);

  // Enter
  var newArea = area.enter()
  .append("svg:path")
  .attr("class", "area")
  .attr("fill", settings.fillColor);
  updatePath(newArea, areaGenerator);

  var newLine = line.enter()
  .append("svg:path")
  .attr("class", "line")
  .attr("fill", "transparent")
  .attr("stroke", settings.strokeColor)
  .attr("stroke-width", settings.strokeWidth);
  updatePath(newLine, lineGenerator);

  var marker = innerSvg.append("svg:circle")
  .attr("class", "marker")
  .attr("r", "4")
  .attr("fill", settings.markerColor);

  var newHitArea = hitArea.enter()
  .append("svg:path")
  .attr("class", "hit-area")
  .attr("fill", "transparent");
  updatePath(newHitArea, hitAreaGenerator);

  // Exit
  area.exit().remove(); // TODO check this
  line.exit().remove(); // TODO check this
  hitArea.exit().remove(); // TODO check this


  // Interactivity
  var trendsDict = {};
  trends.forEach(function(trend) {
    var timestamp = getDateRoundedToGranularity(trend.timestamp, granularity);
    trendsDict[timestamp] = trend;
  });

  var timeFormat = d3.time.format("%e %b %H:%M")
  var maxTrend = trends.reduce(function(prevTrend, currentTrend) {
    return !prevTrend || currentTrend.value > prevTrend.value ? currentTrend : prevTrend;
  });

  function setMarker(timestamp) {
    var value = trendsDict[timestamp].value,
        tooltipText = value+" comentários, "+timeFormat(timestamp);
    marker.attr("cx", xScale(timestamp)).attr("cy", -yScale(value));
    d3.select("#trendline-tooltip").html(tooltipText);
    highlightEvent(".event[data-timestamp='"+timestamp+"']");
  }


  newHitArea
  .on("mouseout", function() {
    setMarker(maxTrend.timestamp);
  })
  .on("mousemove", function() {
    var timestamp = getDateRoundedToGranularity(xScale.invert(d3.mouse(d3.event.target)[0]), granularity);
    setMarker(timestamp);
  });

  setMarker(maxTrend.timestamp);
}

function updatePath(area, generator) {
  area.transition()
  .duration(settings.animatinoDuration)
  .attr("d", generator);
}

function highlightEvent(selector) {
  d3.selectAll(".event").classed("highlighted", false);
  if (selector) {
    d3.select(selector).classed("highlighted", true);
  }
}

function getDateRoundedToGranularity(date, granularity) {
  return new Date(Math.round(date.getTime()/granularity)*granularity);
}

drawTrendline(d3.select("#g-trendline"), 512, 80, 3600e3, data.trends);

})();
