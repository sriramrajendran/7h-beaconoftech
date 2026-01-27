# React Performance Optimization Tips

Performance is crucial for delivering smooth user experiences in React applications. Here are proven techniques to optimize your React apps.

## 1. Use React.memo for Component Memoization

Prevent unnecessary re-renders by memoizing components:

```jsx
const UserCard = React.memo(({ user, onUpdate }) => {
  console.log('Rendering UserCard:', user.id);
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>
        Update
      </button>
    </div>
  );
});
```

## 2. Implement useMemo for Expensive Calculations

Cache expensive computations:

```jsx
const ExpensiveComponent = ({ data, filter }) => {
  const filteredData = useMemo(() => {
    console.log('Running expensive filter...');
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

## 3. Use useCallback for Function References

Prevent function recreation on every render:

```jsx
const TodoList = ({ todos, onToggle }) => {
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
```

## 4. Virtualize Long Lists

Use react-window for large datasets:

```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
);

const VirtualizedList = ({ itemCount }) => (
  <List
    height={600}
    itemCount={itemCount}
    itemSize={35}
    width="100%"
  >
    {Row}
  </List>
);
```

## 5. Code Splitting with React.lazy

Load components on demand:

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  </div>
);
```

## 6. Optimize State Management

- **Local state** for component-specific data
- **Context** for global, infrequently updated data
- **State management library** for complex state

```jsx
// Bad: Updating context frequently causes re-renders
const ThemeContext = createContext();

// Good: Separate static and dynamic contexts
const StaticThemeContext = createContext({ colors: {} });
const DynamicThemeContext = createContext({ isDarkMode: false });
```

## 7. Use Production Build

Always use production builds:

```bash
# Development
npm start

# Production
npm run build
npm serve -s build
```

## 8. Bundle Size Optimization

Analyze and reduce bundle size:

```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run analyze

# Tree shaking
import { specificFunction } from 'large-library'; // ✅
import * as LargeLibrary from 'large-library'; // ❌
```

## 9. Image Optimization

- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Serve responsive images

```jsx
const OptimizedImage = ({ src, alt, ...props }) => (
  <picture>
    <source srcSet={`${src}.avif`} type="image/avif" />
    <source srcSet={`${src}.webp`} type="image/webp" />
    <img
      src={`${src}.jpg`}
      alt={alt}
      loading="lazy"
      {...props}
    />
  </picture>
);
```

## 10. Performance Monitoring

Track performance metrics:

```jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Bonus: React DevTools Profiler

Use React DevTools to identify performance bottlenecks:

1. Open React DevTools
2. Go to Profiler tab
3. Record interactions
4. Analyze flame graph

## Conclusion

Performance optimization is an ongoing process. Start with the most impactful changes:

1. **Memoization** (React.memo, useMemo, useCallback)
2. **Code splitting** for large applications
3. **Virtualization** for long lists
4. **Bundle optimization** for faster loads

Monitor your app's performance regularly and optimize based on real user data.
