const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Sequelize = require('./data/database');

//const appointmentRoutes = require('./routes/myroutes');
const Appointment = require('./models/appointment');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// Add the following route handler


app.post('/appointment/add-appointment', async (req, res, next) => {
    try {
        if (!req.body.phoneNo) {
            throw new Error('phoneNo is mandatory');
        }
        const name = req.body.name;
        const emailid = req.body.emailid;
        const phoneNo = req.body.phoneNo;

        const data = await Appointment.create({ name: name, emailid: emailid, phoneNo: phoneNo });
        res.status(201).json({ newappointmentDetail: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/appointment/get-appointment', async (req, res, next) => {
    try {
        const allAppointments = await Appointment.findAll();
        res.status(200).json({ allAppointments: allAppointments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.delete('/appointment/delete-appointment/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        await Appointment.destroy({ where: { id: appointmentId } });
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
