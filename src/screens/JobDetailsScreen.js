import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JobDetailsScreen({ route }) {
    const { job } = route.params || {};

    if (!job) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No job details available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.detail}>What we do: {job.company_name || "N/A"}</Text>
            <Text style={styles.detail}>Job Role: {job.job_role || "N/A"}</Text>
            <Text style={styles.detail}>Job Type: {job.job_hours || "N/A"}</Text>
            <Text style={styles.detail}>About us: {job.other_details || "N/A"}</Text>
            <Text style={styles.detail}>Job Category: {job.job_category || "N/A"}</Text>
            <Text style={styles.description}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9', // Softer background for better readability
    },
    title: {
        fontSize: 26, // Slightly larger font for the title
        fontWeight: 'bold',
        color: '#333', // Neutral text color for better contrast
        marginBottom: 15, // Added more space below the title
        textAlign: 'center', // Center-aligning the title
    },
    detail: {
        fontSize: 16,
        color: '#555', // Slightly muted color for the details
        lineHeight: 24, // Added line height for readability
        marginBottom: 8, // Increased spacing between details
    },
    description: {
        fontSize: 14,
        color: '#666', // Consistent muted color for the description
        marginTop: 15,
        lineHeight: 22,
    },
    errorText: {
        fontSize: 18,
        color: '#d9534f', // Using a softer red to reduce harshness
        textAlign: 'center', // Centered error message
        marginTop: 50, // Added space to position error text visually
    },
});
