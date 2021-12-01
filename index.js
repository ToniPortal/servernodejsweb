var compression = require('compression'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    colors = require('colors'),
    moment = require('moment'),
    path = require('path'),
    fs = require('fs'),
    helmet = require('helmet'),
    mcache = require('memory-cache'),
    spdy = require('spdy'),
    port = process.env.PORT || 3000;





app.listen(3000)



/*une fois que vous avez l'intention de traiter des fichiers texte d'une taille supérieure à environ 10 Mo
,je vous conseille de laisser tomber readFile et de commencer à utiliser les flux(fs.readfilestream).
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())

// server-sent event stream
app.get('/events', function(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    // send a ping approx every 2 seconds
    var timer = setInterval(function() {
        res.write('data: ping\n\n')

        // !!! this is the important part
        res.flush()
    }, 2000)

    res.on('close', function() {
        clearInterval(timer)
    })
});

colors.setTheme({ //mettre des couleur sur le console.log
    silly: 'rainbow',
    input: 'grey', //contribution
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
console.log('---------------------------------'.verbose)

console.log(('Langue:' + moment.locale('fr') + 'ançaise\n').silly + //Langue française
    '---------------------------------'.verbose +
    '\nDémarré le :\n'.info +
    moment().format('llll').prompt /*    mar. 18 sept. 2018 20:59 */ )





var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, head, body, duration * 1000);
                res.sendResponse(head, body)
            }
            next()
        }
    }
}

// set up plain http server

var http = express();
// set up a route to redirect http to https
http.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})

// have it listen on 8080
http.listen(8080);





app.get('/', cache(20), function(req, res) {
    fs.exists("./Page web/accueil/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/accueil/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});



function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


app.get('/erreur406', function(req, res) {

    fs.writeFile(`./data/botsocket/${makeid(5)}.txt`, "problème: il manque une réponse", function(err) {
        if (err) throw err;
    });
    res.redirect('/botsocket')

});


app.get('/botsocket', function(req, res) {
    fs.exists("./Page web/botsocket/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/botsocket/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file

        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/calc', function(req, res) {
    fs.exists("./Page web/calculatricejavascript/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/calculatricejavascript/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file

        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});





app.get('/fanart', function(req, res) {
    fs.exists("./Page web/fanart/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/fanart/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});





app.get('/jeux', function(req, res) {
    fs.exists("./Page web/jeux/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/jeux/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});







app.get('/accueil', function(req, res) {
    fs.exists("./Page web/accueil/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/accueil/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/morpion/morpiona2', function(req, res) {
    fs.exists("./Page web/morpion/morpiona2/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/morpion/morpiona2/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});

app.get('/anim/js', function(req, res) {
    fs.exists("./Page web/anim/index.js", function(exists) {
        if (exists) {
            fs.readFile('./Page web/anim/index.js', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});






app.get('/anim', function(req, res) {
    fs.exists("./Page web/anim/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/anim/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {
            var chiffre = '0'
            chiffre++
            if (chiffre == '1') {
                console.log('Le fichier ici: '.error + './Page web/anim/index.html'.warn + ' n\'éxiste pas'.error);
                oui(); /* Function oui */
                res.redirect('/notexist') //redirection
                setTimeout(function() { non() /*Function*/ }, 50) /* Timeout au cas ou*/
            } /*Pour pas que il le fasse plein de fois */
        }; /*else exist */
    }); //fs ecist

}); //Fin app get

app.get('/chat', function(req, res) {
    fs.exists("./Page web/chat/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/chat/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);



                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});






app.get('/notexist', function(req, res) {



        fs.exists("./Page web/notexist/index.html", function(exists) {
            if (exists) {
                fs.readFile('./Page web/notexist/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                })
            } else {
                console.log('Le fichier ici: '.error + './Page web/notexist/index.html'.warn + ' n\'éxiste pas'.error)
                console.log('Chargement du message de '.info + '\"Erreur'.error + ' Foetal !\"'.silly)
                console.log('Cause de l\'erreur: le fichier html qui vous dit que le fichier n\'existe ben lui aussi il n\'hésite pas'.white)
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write('<!DOCTYPE html>' +
                    '<html>' +
                    '    <head>' +
                    '<link rel="stylesheet" href="/material">' +
                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>' +
                    '        <title>Erreur Foetal !</title>' +
                    '    </head>' +
                    '    <body> <div class="center">' +
                    '     	<H3>Vous avez été redirigée ici car le fichier html qui vous dit que le fichier n\'existe pas lui aussi' +
                    '         il n\'existe pas !</H3><br><br> ' +
                    '<a onclick="javascript:window.history.back()" class="btn-large waves-effect waves-light orange">Cliquer ici pour revenir en arrière</a><br><br>' +
                    '<br><br><a href="/" class="btn-large waves-effect waves-light orange">Cliquer ici pour revenir sur l\'acceuil</a><br><br>' +
                    '<H5>Si ce lien juste au dessue recharge la page ça veut dire que  l\'acceuil n\'existe pas,attendez que le dev regle le probléme</H5>' +
                    '    <div> </body>' +
                    '</html>');
                res.end();
            }
        })


    }) // fin app get notexists




app.get('/amino', function(req, res) {
    fs.exists("./Page web/amino/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/amino/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/pagerp', function(req, res) {
    fs.exists("./Page web/pagerp/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/pagerp/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/ampoule', function(req, res) {
    fs.exists("./Page web/ampoule/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/ampoule/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/ampoule/feed.png', function(req, res) { //chargement images

    if (req.url.indexOf('./Page web/ampoule/feed.png') < 0) {
        res.writeHead(200, { "Content-Type": "image/gif" });
        res.write(fs.readFileSync('./Page web/ampoule/feed.png'));
        res.end();
    }
})
app.get('/ampoule/feed-blue.png', function(req, res) { //chargement images

    if (req.url.indexOf('./Page web/ampoule/feed-blue.png') < 0) {
        res.writeHead(200, { "Content-Type": "image/gif" });
        res.write(fs.readFileSync('./Page web/ampoule/feed-blue.png'));
        res.end();
    }
})
app.get('/material', function(req, res) { //chargement css

    if (req.url.indexOf('./data/material.css') < 0) {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(fs.readFileSync('./data/materiel.css'));
        res.end();
    }
})

app.get('/jquery', function(req, res) { //chargement js

    if (req.url.indexOf('./data/jquery.js') < 0) {
        res.writeHead(200, { "Content-Type": "js" });
        res.write(fs.readFileSync('./data/jquery.js'));
        res.end();
    }
})


app.get('/morpion', function(req, res) {
    fs.exists("./Page web/morpion/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/morpion/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});


app.get('/portallien', function(req, res) {
    fs.exists("./Page web/portallien/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/portallien/index.html', 'utf-8', function(error, content) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(content);
            }); //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});

app.get('/morpion/a2', function(req, res) {
    fs.exists("./Page web/morpion/a2/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/morpion/a2/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {

            res.redirect('/notexist')

        }; /*else exist */
    }); //fs ecist
});



app.get('/puissance4', function(req, res) {
    fs.exists("./Page web/puissance4/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/puissance4/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {
            var chiffre = '0'
            chiffre++
            if (chiffre == '1') {
                console.log('Le fichier ici: '.error + './Page web/accueil/index.html'.warn + ' n\'éxiste pas'.error);
                oui(); /* Function oui */
                res.redirect('/notexist') //redirection
                setTimeout(function() { non() /*Function non*/ }, 50) /* Timeout au cas ou*/
            } /*Pour pas que il le fasse plein de fois */
        }; /*else exist */
    }); //fs ecist
});

app.get('/puissance4/images/grille.png', function(req, res) { //chargement images
    if (req.url.indexOf('./Page web/puissance4/images/grille.png') < 0) {
        res.writeHead(200, { "Content-Type": "image/gif" });
        res.write(fs.readFileSync('./Page web/puissance4/images/grille.png'));
        res.end();
    }
});

app.get('/puissance4/images/jaune.png', function(req, res) { //chargement images
    if (req.url.indexOf('./Page web/puissance4/images/jaune.png') < 0) {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.write(fs.readFileSync('./Page web/puissance4/images/jaune.png'));
        res.end();
    }
});

app.get('/puissance4/images/rouge.png', function(req, res) { //chargement images
    if (req.url.indexOf('./Page web/puissance4/images/rouge.png') < 0) {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.write(fs.readFileSync('./Page web/puissance4/images/rouge.png'));
        res.end();
    }
});




app.get('/api/fruits', function(req, res) {
    var data = {
        fruits: ['banana', 'apple'],
        how_many: 2
    };
    res.json(data);
});


var formidable = require('formidable'),
    util = require('util'),
    fss = require('fs-extra')
app.post('/upload', function(req, res) {
    if (req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            if (err) {
                console.error(err);
            }
            fs.exists("./Page web/pageupload/finie/index.html", function(exists) {
                if (exists) {
                    fs.writeFile("./Page web/pageupload/finie/num.txt", util.inspect({ fields: fields, files: files }), function(err) {
                        if (err) throw err;
                        console.log('Nous avons écrit non dans le fichier: fichier.txt'.info)
                    });
                    fs.readFile('./Page web/pageupload/finie/index.html', 'utf-8', function(error, content) {
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.end(content)
                        }) //fin fs read file
                } else {

                    res.redirect('/notexist')

                }; /*else exist */
            }); //fs ecist
        });


        form.on('fileBegin', function(name, file) {
            file.path = path.join('./temp/') + file.name;
        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 50;
            console.log(percent_complete.toFixed(2));
        });

        form.on('end', function(fields, files) {
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;

            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = path.join(__dirname, '/data/upload/');

            fss.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!".info);

                    var id = Math.round((Math.random() * 500000));
                    fs.rename(new_location + file_name, new_location + id + "." + getFileExtension(file_name), (err) => {
                        if (err) throw err;
                        console.log('Rename complete!'.info);



                    });
                    // Delete the "temp" file
                    fss.unlink(temp_path, function(err) {
                        if (err) {
                            console.error(err);
                            console.log("TROUBLE deletion temp !");
                        } else {
                            console.log("success deletion temp !");
                        }
                    });
                }
            });


        });

        return;
    }
});

function getFileExtension(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}
app.get('/pageupload', function(req, res) {
    fs.exists("./Page web/pageupload/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/pageupload/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {
            var chiffre = '0'
            chiffre++
            if (chiffre == '1') {
                console.log('Le fichier ici: '.error + './Page web/accueil/index.html'.warn + ' n\'éxiste pas'.error);
                oui(); /* Function oui */
                res.redirect('/notexist') //redirection
                setTimeout(function() { non() /*Function*/ }, 50) /* Timeout au cas ou*/
            } /*Pour pas que il le fasse plein de fois */
        }; /*else exist */
    }); //fs ecist


});


app.get('/audioplayer', function(req, res) {
    fs.exists("./Page web/audioplayer/index.html", function(exists) {
        if (exists) {
            fs.readFile('./Page web/audioplayer/index.html', 'utf-8', function(error, content) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }) //fin fs read file
        } else {
            var chiffre = '0'
            chiffre++
            if (chiffre == '1') {
                console.log('Le fichier ici: '.error + './Page web/accueil/index.html'.warn + ' n\'éxiste pas'.error);
                oui(); /* Function oui */
                res.redirect('/notexist') //redirection
                setTimeout(function() { non() /*Function*/ }, 50) /* Timeout au cas ou*/
            } /*Pour pas que il le fasse plein de fois */
        }; /*else exist */
    }); //fs ecist

}); //Fin app get




ms = require('mediaserver'); //ms require

//chargement pour toute les musique
app.get('/portal2end.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal2end.mp3");
});

app.get('/portal1.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal1.mp3");
});
app.get('/portal2.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal2.mp3");
});
app.get('/portal3.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal3.mp3");
});
app.get('/portal4.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal4.mp3");
});
app.get('/portal5.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal5.mp3");
});
app.get('/portal6.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal6.mp3");
});
app.get('/portal7.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal7.mp3");
});
app.get('/portal8.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal8.mp3");
});
app.get('/portal9.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal9.mp3");
});
app.get('/portal10.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal10.mp3");
});
app.get('/portal11.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal11.mp3");
});
app.get('/portal12.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal12.mp3");
});
app.get('/portal13.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal13.mp3");
});
app.get('/portal14.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal14.mp3");
});
app.get('/portal15.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal15.mp3");
});
app.get('/portal16.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal16.mp3");
});
app.get('/portal17.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal17.mp3");
});
app.get('/portal18.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal18.mp3");
});
app.get('/portal19.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal19.mp3");
});
app.get('/portal20.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal20.mp3");
});
app.get('/portal21.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal21.mp3");
});
app.get('/portal22.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal22.mp3");
});
app.get('/portal23.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal23.mp3");
});
app.get('/portal24.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal24.mp3");
});
app.get('/portal25.mp3', function(req, res) {
    ms.pipe(req, res, "./Page web/audioplayer/Portal25.mp3");
});

var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon


app.use(morgan('combined')) // Active le middleware de logging
    // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
    .use(favicon(__dirname + '/public/favicon.ico'))
    .use(function(req, res) { // Répond enfin
        fs.readFile('./Page web/redirection/index.html', 'utf-8', function(error, content) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
        });
    });