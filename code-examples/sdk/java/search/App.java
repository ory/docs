package sh.ory.examples.search;

import org.typesense.api.Client;
import org.typesense.api.Configuration;
import org.typesense.model.SearchParameters;
import org.typesense.model.SearchResult;
import org.typesense.resources.Node;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) {
        try {
            Client searchClient = initializeSearchClient();
            // highlight-start
            // Search identities via Search API
            String collection = "identities-" + System.getenv("ORY_PROJECT_ID"); // Set the collection name
            SearchResult searchResult = searchClient.collections(collection).documents()
                    .search(new SearchParameters().q("test@example.com").queryBy("traits.email"));
            // highlight-end

            System.out.println("Search results: " + searchResult);
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static Client initializeSearchClient() {
        try {
            List<Node> nodes = new ArrayList<>();
            Node node = new Node("", "", "");
            // highlight-start
            // Set the base URL to the Ory Search API endpoint
            node.baseUrl = System.getenv("ORY_BASE_URL") + "/admin/preview/search/v0beta1";
            nodes.add(node);
            Configuration config = new Configuration(
                    nodes,
                    Duration.ofSeconds(5),
                    System.getenv("ORY_API_KEY")); // Use your Ory API key here
            // highlight-end
           return new Client(config);

        } catch (Exception e) {
            System.err.println("Error initializing search client: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
