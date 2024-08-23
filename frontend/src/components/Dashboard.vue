<!-- components/Dashboard.vue -->
<template>
    <div class="dashboard-container">
        <h2>Dashboard</h2>
        <div v-if="emails.length">
            <h3>Pending Emails</h3>
            <ul>
                <li v-for="email in emails" :key="email._id">
                    <strong>{{ email.subject }}</strong> from {{ email.from }}
                    <button @click="approveEmail(email._id)">Approve</button>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No pending emails</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            emails: []
        };
    },
    async created() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/emails/pending', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.emails = response.data;
        } catch (error) {
            console.error('Error fetching pending emails:', error);
        }
    },
    methods: {
        async approveEmail(emailId) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('/api/emails/approve', { emailId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.emails = this.emails.filter(email => email._id !== emailId);
            } catch (error) {
                console.error('Error approving email:', error);
            }
        }
    }
};
</script>

<style scoped>
.dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
