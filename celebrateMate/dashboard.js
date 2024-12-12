document.addEventListener('DOMContentLoaded', (event) => {
    loadReminders();
});

function saveReminder() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const email = document.getElementById('email').value;
    const editIndex = document.getElementById('editIndex').value;

    if (name && date) {
        let reminders = localStorage.getItem('reminders');
        if (reminders) {
            reminders = JSON.parse(reminders);
        } else {
            reminders = [];
        }

        const reminder = {
            name: name,
            date: date,
            email: email
        };

        if (editIndex === '') {
            reminders.push(reminder);
        } else {
            reminders[editIndex] = reminder;
            document.getElementById('editIndex').value = '';
        }

        localStorage.setItem('reminders', JSON.stringify(reminders));

        document.getElementById('reminderForm').reset();
        loadReminders();
    } else {
        alert('Please fill out all fields');
    }
}

function loadReminders() {
    let reminders = localStorage.getItem('reminders');
    if (reminders) {
        reminders = JSON.parse(reminders);
    } else {
        reminders = [];
    }

    const remindersList = document.getElementById('reminders');
    remindersList.innerHTML = '';

    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${reminder.name} - ${new Date(reminder.date).toLocaleDateString()}
            <div>
                <button class="edit-btn" onclick="editReminder(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
                <button class="email-btn" onclick="sendEmailReminder('${reminder.name}', '${reminder.date}', '${reminder.email}')">Send Email</button>
            </div>
            </div>
        `;
        remindersList.appendChild(li);
    });
}

function editReminder(index) {
    let reminders = localStorage.getItem('reminders');
    reminders = JSON.parse(reminders);

    const reminder = reminders[index];
    document.getElementById('name').value = reminder.name;
    document.getElementById('date').value = reminder.date;
    document.getElementById('email').value = reminder.email;
    document.getElementById('editIndex').value = index;
}

function deleteReminder(index) {
    let reminders = localStorage.getItem('reminders');
    reminders = JSON.parse(reminders);

    reminders.splice(index, 1);

    localStorage.setItem('reminders', JSON.stringify(reminders));
    loadReminders();
}

function sendEmailReminder(name, date, email) {
    console.log('Sending email to:', email); 
    emailjs.send('service_w2onooe', 'template_jb0shw8', {
        to_email: email,
        to_name: 'Tanishq',
        friend_name: name,
        friend_birthday: new Date(date).toLocaleDateString()
    }).then(function(response) {
        alert('Email sent successfully!');
    }, function(error) {
        alert('Failed to send email. Please try again.');
    });


}