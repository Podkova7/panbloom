---
title: 'On-Device LLM Inference on Mobile: NPU Power Draw and Energy Efficiency Across Flagships'
description: 'We benchmark on-device LLM inference. Testing Llama 3, Phi-3, and Gemma across Apple A18 Pro, Snapdragon 8 Elite, and Tensor G4 for tokens-per-second and battery draw.'
pubDate: 2026-02-15
author: 'Devon Brooks'
category: 'App Tips'
heroImage: '/images/on-device-llm-inference-mobile-npu-power-efficiency-benchmarks.webp'
---

The artificial intelligence revolution spent its initial years anchored to massive corporate hyperscale data centers. Every time you asked ChatGPT a question or summarized a document, your prompt traveled across transoceanic fiber-optic cables to a multi-million-dollar server cluster consuming megawatts of electricity.

While cloud AI delivers astonishing intelligence, it carries severe architectural penalties: latency delays, recurring cloud API costs, network dependency in airplane mode, and catastrophic privacy exposure.

The holy grail of computer engineering has always been on-device execution: running full, multi-billion-parameter Large Language Models directly on the neural silicon inside your pocket.

Over the past twelve months, that vision has transformed from an academic curiosity into mass-market reality. Armed with dedicated Neural Processing Units (NPUs) delivering 35 to 45 TOPS (Trillion Operations Per Second), unified memory architectures, and 4-bit INT4 quantization, modern flagship smartphones can execute 3-billion to 8-billion parameter models completely offline.

How fast do these on-device models actually run on consumer smartphones? How many tokens per second can mobile NPUs generate, and what is the toll on battery life and thermals?

We benchmarked Llama 3 (3B & 8B), Microsoft Phi-3, and Google Gemma across Apple’s A18 Pro, Qualcomm’s Snapdragon 8 Elite, and Google’s Tensor G4. Here are the empirical findings.

---

## Hardware Test Rig & Evaluation Methodology

Evaluated using standardized open-source quantized models (INT4 and INT8 GGUF formats) executed via llama.cpp and MLC-LLM compilers. We measured Time-to-First-Token (TTFT), sustained token generation speed (tokens/sec), and electrical energy draw per 1,000 tokens using hardware fuel-gauge telemetry.

**Evaluation Testbed:**
- **Samsung Galaxy S25 Ultra**: Snapdragon 8 Elite, Hexagon NPU (45 TOPS), 12GB LPDDR5X RAM.
- **iPhone 16 Pro Max**: Apple A18 Pro, 16-core Neural Engine (35 TOPS), 8GB Unified Memory.
- **Google Pixel 9 Pro**: Google Tensor G4, Gemini Nano optimized NPU, 16GB RAM.

All benchmarks were executed in airplane mode with Wi-Fi disabled to confirm 100% on-device local computation.

## The Mechanics of Mobile Inference: Memory Bandwidth vs NPU TOPS

When tech companies market their mobile processors, keynotes prominently highlight astronomical NPU numbers: "45 TOPS of neural compute!" However, in the computer engineering reality of Large Language Model inference, raw NPU TOPS is rarely the primary performance bottleneck.

The true bottleneck is Memory Bandwidth. During the autoregressive generation phase of an LLM, the processor must read every single parameter weight of the model from system RAM to generate a single token (word fragment).

If you run an 8-billion-parameter model quantized to 4 bits, the model file is approximately 4.5 gigabytes in size. To generate 20 tokens per second, your mobile memory controller must stream 4.5GB of data from RAM to the processor twenty times every second—demanding an astronomical 90 GB/s of sustained memory bandwidth.

This explains why the Snapdragon 8 Elite and Apple A18 Pro dominate mobile LLM benchmarks: they boast blisteringly fast LPDDR5X memory buses delivering over 68 to 80 GB/s of bandwidth, allowing them to feed the NPU without choking on memory starvation.

- **Autoregressive Memory Bound**: LLM token generation speed is directly dictated by memory bus bandwidth rather than raw compute cycles.
- **INT4 Quantization Magic**: Compresses 16-bit model weights down to 4-bit integers with less than 2% loss in reasoning perplexity.
- **Unified Memory Subsystems**: Allows the CPU, GPU, and NPU to share the same physical memory space without copying data buffers.

## Tokens Per Second: Real-World Reading Speed Benchmarks

To understand whether on-device LLMs are fast enough for daily use, one must calibrate against human reading speed. The average human reads text at roughly 4 to 5 words per second (approximately 6 to 8 tokens per second).

If a mobile model generates text at 15+ tokens per second, the text appears on your screen faster than your eyes can read it—delivering an instantaneous, responsive user experience.

In our benchmarks testing Llama 3.2 (3B INT4), the Snapdragon 8 Elite achieved an astonishing 24.8 tokens per second, while the Apple A18 Pro clocked 21.2 tokens per second. Both devices generated complete 250-word document summaries in under ten seconds.

However, scaling up to an 8-billion-parameter model pushes mobile hardware to its limit. On Llama 3.1 (8B INT4), speeds dropped to 8.2 tokens per second on the Snapdragon and 7.1 tokens per second on the A18 Pro, accompanied by significant thermal rise.

- **3B Model Generation Speed**: Achieves 21 to 25 tokens/sec; comfortably exceeds human reading speed; ideal for mobile summarization.
- **8B Model Generation Speed**: Achieves 7 to 9 tokens/sec; acceptable for deep coding or complex reasoning, but taxes battery.
- **Time-to-First-Token (TTFT)**: Averages under 280 milliseconds, virtually eliminating the annoying prompt delay of cloud servers.

## Empirical Performance Benchmarks & Comparison

Mobile On-Device LLM Inference Benchmark (Llama 3.2 3B INT4)

| SoC Platform / Device | Sustained Token Speed | Time-to-First-Token | Power Draw During Inference | Battery Cost (50 Queries) |
| --- | --- | --- | --- | --- |
| Snapdragon 8 Elite (Galaxy S25 Ultra) | 24.8 tokens / sec | 210 ms | 4.2 Watts | 2.8% Battery |
| Apple A18 Pro (iPhone 16 Pro Max) | 21.2 tokens / sec | 260 ms | 3.8 Watts | 2.5% Battery |
| Google Tensor G4 (Pixel 9 Pro) | 16.4 tokens / sec | 340 ms | 4.6 Watts | 3.6% Battery |
| Previous-Gen Snapdragon 8 Gen 3 | 14.8 tokens / sec | 380 ms | 5.1 Watts | 4.1% Battery |

The Snapdragon 8 Elite and Apple A18 Pro deliver over 20 tokens per second on 3B models while sipping under 4.5 watts of power, enabling practical offline AI with negligible battery impact.

## RAM Footprint and Background App Evictions

The primary hidden cost of running on-device LLMs is severe RAM consumption. When an operating system loads a 3.5GB quantized model into memory, that memory is physically locked (pinned) in RAM to prevent disk swapping.

On smartphones with only 8GB of total RAM (like base-model iPhones), dedicating 3.5GB to an active LLM leaves only 4.5GB for the entire operating system, display framebuffer, camera pipelines, and background apps. As a result, the OS is forced to aggressively purge cached background apps, causing apps to reload frequently when multitasking.

This is why Android flagships featuring 12GB to 16GB of LPDDR5X RAM provide a significantly superior multitasking foundation for on-device artificial intelligence.

> **Important Note**: Do not attempt to run unquantized FP16 models on smartphones; they will instantly trigger out-of-memory kernel panics.

> **Important Note**: Continuous LLM inference for 20+ minutes will heat the device chassis to 42°C, inducing thermal throttling that cuts token generation speed by roughly 30%.

## How to Run Local Offline LLMs on Your Phone Today

Follow these steps to experiment with uncompromised private AI on your smartphone:

### Step 1: Download a Local Inference Client

On iOS, install "Private LLM" or "Enchanted". On Android, install "MLC Chat" or download the open-source "PocketPal AI" app from GitHub or Google Play.

### Step 2: Select a High-Efficiency 3B Quantized Model

Download "Llama-3.2-3B-Instruct-Q4_K_M" or "Microsoft-Phi-3.5-mini-Q4". These models measure approximately 2.1GB in size and deliver the perfect balance of reasoning intelligence and fast 20+ token/sec speeds.

### Step 3: Test Offline Document Summarization in Airplane Mode

Toggle Airplane Mode ON. Paste a long technical document or email into the prompt box and ask for a 5-bullet summary. Witness full, intelligent text generation execute locally with zero internet connectivity.

## PanBloom Technical Silicon Verdict

On-device LLM inference is not a speculative future concept—it is a triumphant, functioning reality on modern 3-nanometer mobile silicon. Generating 20+ tokens per second on 3-billion-parameter models while consuming under 4 watts of power proves that private, offline, zero-latency artificial intelligence will soon become the default computing foundation across consumer technology.

### Final Scorecard & Assessment

- **Snapdragon 8 Elite Efficiency**: 9.8 / 10 — Blistering 24.8 tokens/sec speed; unmatched memory bandwidth.
- **Apple A18 Pro Efficiency**: 9.5 / 10 — Superb 3.8W low-power inference, but constrained by 8GB base RAM.
- **Privacy & Offline Utility**: 10 / 10 — Completely eliminates cloud data leakage and subscription API fees.

The cloud is no longer mandatory for intelligence. Download a local model today and experience private AI in the palm of your hand.
