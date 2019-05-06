package rc.noteit.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rc.noteit.model.Note;
import rc.noteit.model.Notebook;
import rc.noteit.model.security.Authority;
import rc.noteit.model.security.AuthorityName;
import rc.noteit.model.security.User;
import rc.noteit.security.repository.AuthorityRepository;
import rc.noteit.security.repository.UserRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * This component will only execute (and get instantiated) if the
 * property noteit.db.recreate is set to true in the
 * application.properties file
 */

@Component
@ConditionalOnProperty(name = "noteit.db.recreate", havingValue = "true")
public class DbSeeder implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository authorityRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    private NotebookRepository notebookRepository;
    private NoteRepository noteRepository;

    public DbSeeder(NotebookRepository notebookRepository,
                    NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }


    @Override
    public void run(String... args) {
        // Remove all existing Auhority , users
        authorityRepository.deleteAll();
        userRepository.deleteAll();
        // create authorities
        Authority authority1 = new Authority();
        authority1.setName(AuthorityName.ROLE_ADMIN);
        Authority authority2 = new Authority();
        authority2.setName(AuthorityName.ROLE_USER);

        // save authority
        authorityRepository.save(authority1);
        authorityRepository.save(authority2);

        // create users
        User user = new User("ahmed", passwordEncoder.encode("123"),
                "ahmed", "marey", "ahmed@gmail.com",
                true, new Date(),  convertArrayToSet(new Authority[]{authority1 , authority2}));
        authority2.setName(AuthorityName.ROLE_USER);
        User user2 = new User("user", passwordEncoder.encode("123"),
                "user", "user", "user@gmail.com",
                true, new Date(), convertArrayToSet(new Authority[]{ authority2}) );
        User user3 = new User("admin", passwordEncoder.encode("admin"),
                "admin", "admin", "admin@gmail.com",
                true, new Date(), convertArrayToSet(new Authority[]{authority1 , authority2}));

        userRepository.save(user);
        userRepository.save(user2);
        userRepository.save(user3);


        // Remove all existing entities
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();


        // Save a default notebook
        var defaultNotebook = new Notebook("Default");
        this.notebookRepository.save(defaultNotebook);

        var quotesNotebook = new Notebook("Quotes");
        this.notebookRepository.save(quotesNotebook);

        // Save the welcome note
        var note = new Note("Hello", "Welcome to Note It", defaultNotebook);
        this.noteRepository.save(note);

        // Save a quote note
        var quoteNote = new Note("Latin Quote", "Carpe Diem", quotesNotebook);
        this.noteRepository.save(quoteNote);

        System.out.println("Initialized database");
    }
    // Generic function to convert an Array to Set
    public static <T> Set<T> convertArrayToSet(T array[])
    {

        // Create an empty Set
        Set<T> set = new HashSet<>();

        // Iterate through the array
        for (T t : array) {
            // Add each element into the set
            set.add(t);
        }

        // Return the converted Set
        return set;
    }
}
