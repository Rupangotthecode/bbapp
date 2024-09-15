import isEmpty from 'lodash/isEmpty';

const formatDateForItem = (date) => {
    const dateParts = date.split("-")
    const DD = dateParts[0];
    const MM = dateParts[1];
    const YYYY = dateParts[2];
    const formattedDate = `${YYYY}-${MM}-${DD}`

    return formattedDate
}

export const formatAgentaItems = (schedules) => {
    const agendaItems = schedules.map((schedule) => {
        const { title, itemTime, duration, dateOfCreation, itemTitle, itemTournament, poolNo, matchNo, username } = schedule
        return {
            title: formatDateForItem(title),
            data: [{
                hour: itemTime,
                duration: duration,
                title: itemTitle,
                itemTime: itemTime,
                tournament: itemTournament,
                poolNo: poolNo,
                matchNo: matchNo,
                username: username,
                dateOfCreation: dateOfCreation
            }]
        }
    })

    agendaItems.sort((a, b) => {
        const dateA = new Date(a.title);
        const dateB = new Date(b.title);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If the dates are the same, sort by hour (time)
        const timeA = new Date(`1970-01-01T${a.data[0].hour}`);
        const timeB = new Date(`1970-01-01T${b.data[0].hour}`);

        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;

        return 0;
    });
    console.log(agendaItems)
    return agendaItems
}

export const getMarkedDates = (agendaItems) => {
    return agendaItems.reduce((marked, item) => {
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = { marked: true };
        } else {
            marked[item.title] = { disabled: true };
        }
        return marked;
    }, {});
};


// Agenda items
// export const agendaItems = [
//     {
//         title: dates[0],
//         data: [{ hour: '12am', duration: '1h', title: 'SRM vs PES', tournament: 'SRM bb tournament 2024', poolNo: "3", matchNo: "2" }]
//     },
//     {
//         title: dates[1],
//         data: [
//             { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
//             { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
//         ]
//     },
//     {
//         title: dates[2],
//         data: [
//             { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
//             { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
//             { hour: '3pm', duration: '1h', title: 'Private Yoga' }
//         ]
//     },
//     {
//         title: dates[3],
//         data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
//     },
//     {
//         title: dates[4],
//         data: [{}]
//     },
//     {
//         title: dates[5],
//         data: [
//             { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
//             { hour: '10pm', duration: '1h', title: 'Ashtanga' },
//             { hour: '11pm', duration: '1h', title: 'TRX' },
//             { hour: '12pm', duration: '1h', title: 'Running Group' }
//         ]
//     }
// ];

// Function to get marked dates

