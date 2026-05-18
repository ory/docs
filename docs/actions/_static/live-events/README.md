# Live event streams — screenshots

This directory holds the screenshots embedded in `docs/actions/live-events.mdx`.

## Required screenshots

Replace this README with the following PNG files before the docs PR can render
correctly:

| File                              | What it should show                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `event-streams-empty.png`         | The **Event streams** page under **Authentication → Event streams** for an entitled project, with the **Add new Event Stream** button visible. Empty-state table is fine.            |
| `event-stream-https-dialog.png`   | The **Add event stream** dialog with **HTTPS** selected in the **Event Stream Type** field, showing the **HTTPS endpoint** input (filled with a sample URL like `https://example.com/my-event-endpoint`). |
| `event-stream-sns-dialog.png`     | The **Add event stream** dialog with **AWS SNS** selected, showing the **Role ARN** and **Topic ARN** inputs (filled with sample ARNs).                                              |

## Capture tips

- Take screenshots at a viewport width that matches the surrounding docs
  (typically ~1280px wide). Crop tightly to the relevant UI region.
- Use a project ID matching the one in the MDX `BrowserWindow url=` attribute
  (`b3b748e5-7ddc-4860-a672-2436a877dc93`) only if you're recreating the same
  display URL; otherwise update the MDX to match your project.
- Avoid PII (real email addresses, real workspace names). Use a sandbox
  project.
