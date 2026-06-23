<script lang="ts">
  import type { Block } from '$lib/content/types';
  import TextBlock from './TextBlock.svelte';
  import TermBlock from './TermBlock.svelte';
  import EvidenceBlock from './EvidenceBlock.svelte';
  import DebateBlock from './DebateBlock.svelte';
  import FigureBlock from './FigureBlock.svelte';
  import ImageBlock from './ImageBlock.svelte';
  import QuizBlock from './QuizBlock.svelte';

  interface Props {
    block: Block;
    unitId: string;
    onQuizState?: (allAnswered: boolean) => void;
    onQuizAnswer?: (correct: boolean) => void;
  }
  let { block, unitId, onQuizState, onQuizAnswer }: Props = $props();
</script>

{#if block.type === 'text'}
  <TextBlock {block} />
{:else if block.type === 'term'}
  <TermBlock {block} />
{:else if block.type === 'evidence'}
  <EvidenceBlock {block} />
{:else if block.type === 'debate'}
  <DebateBlock {block} />
{:else if block.type === 'figure'}
  <FigureBlock {block} />
{:else if block.type === 'image'}
  <ImageBlock {block} />
{:else if block.type === 'quiz'}
  <QuizBlock {block} {unitId} onState={onQuizState} onAnswer={onQuizAnswer} />
{/if}
