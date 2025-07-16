package es.jorgemon;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import es.jorgemon.dto.GetEventsRequestDto;
import es.jorgemon.model.Event;
import es.jorgemon.model.Source;
import es.jorgemon.repository.EventsRepository;
import es.jorgemon.repository.SourcesRepository;
import es.jorgemon.service.EventsAndSourcesCreator;
import es.jorgemon.service.EventsAndSourcesLoader;

public class AppTest {
   @BeforeClass
   public static void setUpOnce() {
      App.initialize();
   }

   @Test
   public void testLoadSources() {
      EventsAndSourcesLoader.loadSources();
      assertFalse("Sources should not be empty", EventsAndSourcesLoader.sources.isEmpty());
   }

   @Test
   public void testLoadEvents() {
      EventsAndSourcesLoader.loadEvents();
      assertFalse("Events should not be empty", EventsAndSourcesLoader.events.isEmpty());
   }

   @Test
   public void testGetEvents() {
      GetEventsRequestDto filter = new GetEventsRequestDto();
      filter.setPage(1);
      filter.setPageSize(10);

      List<Event> events = EventsRepository.getEvents(filter);
      assertNotNull("Events list should not be null", events);
      assertFalse("Events list should not be empty", events.isEmpty());
   }

   @Test
   public void testGetEventsCount() {
      GetEventsRequestDto filter = new GetEventsRequestDto();
      filter.setPage(1);
      filter.setPageSize(10);

      long totalCount = EventsRepository.getTotalEventCount(filter);
      assertTrue("Total event count should be greater than 0", totalCount > 0);
   }

   @Test
   public void testGetSources() {
      List<Source> sources = EventsAndSourcesLoader.sources;
      System.out.println("Number of sources: " + sources.size());
      assertNotNull("Sources list should not be null", sources);
      assertFalse("Sources list should not be empty", sources.isEmpty());
   }

   @Test
   public void testSourcesLocation() {
      List<Source> sources = SourcesRepository.getSources();
      for (Source source : sources) {
         assertNotNull("Source location should not be null", source.getLocation());
         double lat = source.getLocation().getLat();
         double lon = source.getLocation().getLon();
         assertTrue(
               "Source latitude should be between " + EventsAndSourcesCreator.MIN_LAT + " and "
                     + EventsAndSourcesCreator.MAX_LAT,
               lat >= EventsAndSourcesCreator.MIN_LAT && lat <= EventsAndSourcesCreator.MAX_LAT);
         assertTrue(
               "Source longitude should be between " + EventsAndSourcesCreator.MIN_LON + " and "
                     + EventsAndSourcesCreator.MAX_LON,
               lon >= EventsAndSourcesCreator.MIN_LON && lon <= EventsAndSourcesCreator.MAX_LON);
      }
   }
}
