var nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(),
    fs = require('fs');
//
//transporter.use('stream', require('nodemailer-dkim').signer({
//    domainName  : 'chb.su',
//    keySelector : 'mail',
//    privateKey  : fs.readFileSync('/etc/opendkim/private.key')
//}));


module.exports = transporter;