const connection = require('../connection');
exports.getDeviceData = (req, res) => {
  var querry = "SELECT * FROM device , client where device.client_id=client.cin_passport and device.imei=?";
  connection.query(querry, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  })
}
exports.AddDevice = (req, res) => {
  var querry = "INSERT INTO device (imei,status,purchase_date,nb_return_sav,insured,guarantee,client_id) VALUES (?,?,?,?,?,?,?)";
  connection.query(querry, [req.body.imei, req.body.status, req.body.purchase_date, req.body.nb_return_sav, req.body.insured, req.body.guarantee, req.body.client_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  })
}
exports.CreateFicheIntervention = (req, res) => {
  var querry = "INSERT INTO intervention (accessoires,type_panne,terminal_pret,description,workflow,imei) VALUES (?,?,?,?,?,?)";
  connection.query(querry, [req.body.accessoires,
    req.body.type_panne,
    req.body.terminal_pret,
    req.body.description,
    req.body.workflow,
    req.params.imei
  ], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      incerementQuerry="UPDATE device SET nb_return_sav=nb_return_sav+1 WHERE imei=?";
      connection.query(incerementQuerry, [req.params.imei], (err, inc) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send(result);
        }   
      })
    }
  })
}
exports.getInterventionsData = (req, res) => {
  var querry = "SELECT * FROM intervention , device,client where intervention.imei=? and intervention.imei=device.imei";
  connection.query(querry, [req.params.imei], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  })
}
