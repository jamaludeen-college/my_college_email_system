<template>
  <v-container>
    <h1>Pending Emails</h1>
    <v-list>
      <v-list-item
        v-for="email in emails"
        :key="email._id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ email.subject }}</v-list-item-title>
          <v-list-item-subtitle>{{ email.body }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="approveEmail(email._id)" color="success">Approve</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'PendingEmails',
  data() {
    return {
      emails: [],
    };
  },
  computed: {
    ...mapState(['token']),
  },
  created() {
    this.fetchPendingEmails();
  },
  methods: {
    async fetchPendingEmails() {
      try {
        const response = await axios.get('http://localhost:5000/api/emails/pending', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.emails = response.data;
      } catch (error) {
        console.error('Error fetching pending emails:', error);
      }
    },
    async approveEmail(emailId) {
      try {
        await axios.post(
          'http://localhost:5000/api/emails/approve',
          { emailId },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        this.fetchPendingEmails();
      } catch (error) {
        console.error('Error approving email:', error);
      }
    },
  },
};
</script>
