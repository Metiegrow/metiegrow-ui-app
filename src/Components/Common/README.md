# Share Functionality

This directory contains a comprehensive sharing system for the Metiegrow application.

## Files

- `shareHandler.js` - Core sharing logic and utilities
- `ShareButton.jsx` - Reusable React component for sharing
- `ShareExample.jsx` - Examples and usage documentation

## Features

### Supported Platforms

- **WhatsApp** - Direct messaging with pre-filled text
- **Facebook** - Share to timeline or groups
- **Twitter** - Tweet with link and text
- **LinkedIn** - Professional sharing
- **Telegram** - Telegram sharing
- **Email** - Open email client with content
- **Copy Link** - Copy URL to clipboard
- **Native Share** - Use device native sharing (when available)

### Content Types

- `post` - Blog posts, articles
- `profile` - User profiles
- `question` - Q&A questions
- `room` - Room listings
- `general` - Custom content

## Quick Start

### Basic Usage

```jsx
import ShareButton from './Components/Common/ShareButton';

function MyComponent() {
  return <ShareButton />;
}
```

### With Content

```jsx
<ShareButton
  type='post'
  data={{
    id: '123',
    title: 'My Amazing Post',
    content: 'This is the full content...',
    author: 'John Doe',
  }}
  size='md'
  showText={true}
/>
```

### With Callback

```jsx
<ShareButton
  onShare={(platform, result) => {
    console.log('Shared to:', platform);
    // Track analytics
  }}
/>
```

## API Reference

### ShareButton Props

| Prop        | Type     | Default     | Description                      |
| ----------- | -------- | ----------- | -------------------------------- |
| `type`      | string   | `'general'` | Content type for URL generation  |
| `data`      | object   | `{}`        | Content data for sharing         |
| `className` | string   | `''`        | Additional CSS classes           |
| `size`      | string   | `'md'`      | Button size: 'sm', 'md', 'lg'    |
| `showText`  | boolean  | `false`     | Show 'Share' text alongside icon |
| `platforms` | array    | `null`      | Limit to specific platforms      |
| `onShare`   | function | `null`      | Callback when share occurs       |

### shareHandler Functions

#### `shareToPlatform(platform, shareData)`

Share to a specific platform.

#### `shareNative(shareData)`

Use native Web Share API if available.

#### `generateShareContent(type, data)`

Generate shareable content for different types.

#### `getAvailablePlatforms()`

Get platforms available on current device/browser.

## Examples

### Post Sharing

```jsx
<ShareButton
  type='post'
  data={{
    id: '123',
    title: 'Amazing opportunity!',
    content: 'Check out this internship...',
    author: 'Sarah Johnson',
  }}
/>
```

### Profile Sharing

```jsx
<ShareButton
  type='profile'
  data={{
    userId: '456',
    name: 'John Doe',
    bio: 'Software Engineer & Mentor',
  }}
/>
```

### Room Sharing

```jsx
<ShareButton
  type='room'
  data={{
    id: '789',
    location: 'Melbourne, Australia',
    roomType: 'Shared Room',
    description: 'Beautiful room with great amenities...',
  }}
/>
```

## Integration Examples

### In PostCard Component

```jsx
// Before
<div className="text-gray-400">
  <ShareIcon className="w-4 h-4" />
</div>

// After
<ShareButton
  type="question"
  data={{
    id: postId,
    title: question,
    content: question,
    author: name
  }}
  size="sm"
/>
```

### In Profile Component

```jsx
<ShareButton
  type='profile'
  data={{
    userId: user.id,
    name: user.name,
    bio: user.bio,
  }}
  showText={true}
/>
```

## Platform URLs

The system generates appropriate URLs for each platform:

- **WhatsApp**: `https://wa.me/?text=...`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?...`
- **Twitter**: `https://twitter.com/intent/tweet?...`
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?...`
- **Telegram**: `https://t.me/share/url?...`
- **Email**: `mailto:?subject=...&body=...`

## Browser Support

- **Native Share API**: Modern browsers (Chrome, Safari, Edge)
- **Fallback**: Opens platform URLs in new tabs
- **Copy Link**: Uses Clipboard API with fallback

## Styling

The ShareButton uses Tailwind CSS classes and can be customized:

```jsx
<ShareButton className='my-custom-class' size='lg' />
```

## Analytics

Track share events using the `onShare` callback:

```jsx
<ShareButton
  onShare={(platform, result) => {
    // Send to analytics service
    analytics.track('share', {
      platform,
      content_type: 'post',
      content_id: '123',
    });
  }}
/>
```

## Error Handling

The system includes comprehensive error handling:

- Platform availability checks
- Fallback mechanisms
- User feedback messages
- Graceful degradation

## Mobile Optimization

- Automatically detects mobile devices
- Prioritizes WhatsApp on mobile
- Uses native sharing when available
- Responsive dropdown positioning
