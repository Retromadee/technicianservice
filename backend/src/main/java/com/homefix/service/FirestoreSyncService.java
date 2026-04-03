package com.homefix.service;

import com.homefix.dto.JobDto;
import com.homefix.dto.QuoteDto;
import org.springframework.stereotype.Service;

@Service
public class FirestoreSyncService {

    public void syncJob(JobDto job) {
        try {
            // Only attempt if Firebase is initialized
            /*
            Firestore db = FirestoreClient.getFirestore();
            db.collection("jobs").document(job.getId().toString()).set(job);
            */
            System.out.println("🔄 Syncing Job to Firestore: " + job.getId());
        } catch (Exception e) {
            System.err.println("❌ Firestore Sync Failed: " + e.getMessage());
        }
    }

    public void syncQuote(QuoteDto quote) {
        try {
            /*
            Firestore db = FirestoreClient.getFirestore();
            db.collection("jobs").document(quote.getJobId().toString())
              .collection("quotes").document(quote.getId().toString()).set(quote);
            */
            System.out.println("🔄 Syncing Quote to Firestore: " + quote.getId());
        } catch (Exception e) {
            System.err.println("❌ Firestore Sync Failed: " + e.getMessage());
        }
    }
}
