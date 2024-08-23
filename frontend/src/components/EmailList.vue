<!-- components/EmailList.vue -->
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Email List</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="email in emails" :key="email.id">
                                <v-list-item-content>
                                    <v-list-item-title>{{ email.subject }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ email.body }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            emails: [
                { id: 1, subject: 'Test Email 1', body: 'This is the body of the test email 1.' },
                { id: 2, subject: 'Test Email 2', body: 'This is the body of the test email 2.' },
            ],
        };
    },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
