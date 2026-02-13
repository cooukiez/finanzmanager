<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  // noinspection ES6UnusedImports
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { handleLogout } from "$lib/client/auth";
  import { userSettings } from "$lib/config/routes";
</script>

<DropdownMenu.Root>
  <!-- Das Dropdown-Menü wird erstellt -->
  <DropdownMenu.Trigger
    class="relative h-9 w-9 rounded-full hover:bg-accent hover:text-accent-foreground"
  >
    <!-- Avatar als Trigger für das Dropdown-Menü -->
    <Avatar.Root class="h-9 w-9">
      <Avatar.Image alt="profile" src="" />
      <!-- Profilbild -->
      <Avatar.Fallback>UP</Avatar.Fallback>
      <!-- Fallback, falls kein Bild geladen wird -->
    </Avatar.Root>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content class="w-56 mx-1">
    <!-- Inhalt des Dropdown-Menüs -->
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
      <DropdownMenu.Separator />
      <!-- Trennlinie -->

      <DropdownMenu.Group>
        <DropdownMenu.Item>
          Profile
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
          <!-- Tastenkombination für das Profil -->
        </DropdownMenu.Item>

        <a href={userSettings}>
          <DropdownMenu.Item>
            Settings
            <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            <!-- Tastenkombination für Einstellungen -->
          </DropdownMenu.Item>
        </a>
      </DropdownMenu.Group>

      <DropdownMenu.Separator />

      <!-- Links zu GitHub-Projekten -->
      <a href="https://github.com/cooukiez/finanzmanager">
        <DropdownMenu.Item>Github</DropdownMenu.Item>
      </a>
      <a href="https://github.com/users/cooukiez/projects/4">
        <DropdownMenu.Item>Project on Github</DropdownMenu.Item>
      </a>

      <!-- Untermenü für Support-Optionen -->
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Support</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Create Issue</DropdownMenu.Item>
          <DropdownMenu.Item>Create Discussion</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Fix it yourself</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>

      <DropdownMenu.Separator />

      <!-- Logout-Funktion mit Tastenkombination -->
      <DropdownMenu.Item onclick={handleLogout}>
        Log out
        <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
